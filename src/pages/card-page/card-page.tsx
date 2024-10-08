import { useEffect, useState } from 'react'
import { Link, generatePath, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ArrowBackOutline } from '@/assets/icons'
import { LearnCard } from '@/components/ui/layout-components'
import { Button } from '@/components/ui/primitives'
import {
  GetRandomCardToLearnResponse,
  useGetDeckQuery,
  useGetRandomCardQuery,
  useSaveGradeOfCardMutation,
} from '@/services'
import { PATH } from '@/shared/enums'
import { FlexContainer } from '@/shared/ui/flex-container'
import { Page } from '@/shared/ui/page'
import { getErrorMessageData } from '@/shared/utils'

import { cn } from './card-page.styles'

export const CardPage = () => {
  const { deckId } = useParams()
  const deckPagePath = deckId && generatePath(PATH.DECK, { deckId })

  const { data: deck, isFetching: isDeckFetching } = useGetDeckQuery({ id: deckId ?? '' })
  const { data: randomCard, isLoading: isRandomCardFetching } = useGetRandomCardQuery({
    id: deckId ?? '',
  })

  const [cardToLearn, setCardToLearn] = useState(randomCard)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (randomCard) {
      setCardToLearn(randomCard)
    }
  }, [randomCard])

  const [saveGrade, { isLoading: isSaveGradeLoading }] = useSaveGradeOfCardMutation()

  const nextQuestionHandler = (cardId: string, grade: number) => {
    saveGrade({ cardId, grade, id: deck?.id ?? '' })
      .unwrap()
      .then(data => {
        setShowAnswer(false)
        setCardToLearn(data)
        toast.success(`You've saved grade ${grade} successfully`)
      })
      .catch(e => {
        const errors = getErrorMessageData(e)

        toast.error(errors as any)
      })
  }

  const isLoad = isDeckFetching || isRandomCardFetching || isSaveGradeLoading

  return (
    <Page load={isLoad}>
      <FlexContainer fd={'column'} gap={'36px'} jc={'left'} pd={'0 20px'}>
        <Button as={Link} className={cn.goBack} to={deckPagePath} variant={'link'}>
          <ArrowBackOutline className={cn.icon} />
          Back to Deck
        </Button>
        <FlexContainer jc={'center'}>
          <LearnCard
            card={cardToLearn ?? ({} as GetRandomCardToLearnResponse)}
            deckName={deck?.name ?? ''}
            onNextQuestion={nextQuestionHandler}
            onShowAnswer={setShowAnswer}
            showAnswer={showAnswer}
          />
        </FlexContainer>
      </FlexContainer>
    </Page>
  )
}
