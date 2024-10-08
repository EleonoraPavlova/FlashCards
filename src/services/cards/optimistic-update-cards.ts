import { AppDispatch, RootState } from '@/services'
import { createUploadedImageURL, revokeObjectURL } from '@/shared/utils'

import { UpdateCardArgs, UpdateCardResponse } from './cards.types'
import { cardsApi } from './cards-api'

type OptimisticUpdateContext = {
  dispatch: AppDispatch
  getState: () => RootState
  queryFulfilled: Promise<{ data: UpdateCardResponse }>
}

export async function optimisticUpdateCards(
  { answerImg, id, questionImg, ...args }: UpdateCardArgs,
  { dispatch, getState, queryFulfilled }: OptimisticUpdateContext
) {
  const cachedArgsForQuery = cardsApi.util.selectCachedArgsForQuery(getState(), 'getCards')
  const patchResults: any[] = []

  const uploadedImageAnswer = createUploadedImageURL(answerImg)
  const uploadedImageQuestion = createUploadedImageURL(questionImg)

  cachedArgsForQuery.forEach(cachedArgs => {
    patchResults.push(
      dispatch(
        cardsApi.util.updateQueryData('getCards', cachedArgs, draft => {
          const itemToUpdateIndex = draft.items.findIndex(card => card.id === id)

          if (itemToUpdateIndex === -1) {
            return
          }

          draft.items[itemToUpdateIndex] = {
            ...draft.items[itemToUpdateIndex],
            ...args,
            answerImg: uploadedImageAnswer ?? null,
            questionImg: uploadedImageQuestion ?? null,
          }
        })
      )
    )
  })

  try {
    await queryFulfilled
  } catch (e) {
    patchResults.forEach(patchResult => {
      patchResult.undo()
    })
  } finally {
    revokeObjectURL(uploadedImageAnswer)
    revokeObjectURL(uploadedImageQuestion)
  }
}
