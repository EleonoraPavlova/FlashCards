import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { DialogDescription as Description, Dialog, DialogContent } from '@/components/ui/primitives'
import { useDeleteCardMutation, useDeleteDeckMutation } from '@/services'
import { DIALOG_ENTITY, PATH } from '@/shared/enums'
import { useDisableOnLoading } from '@/shared/hooks'
import { entityIdScheme } from '@/shared/schemes'
import { getErrorMessageData } from '@/shared/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { DialogFormFooter as Footer, DialogFromHeader as Header } from '../container-components'
import { cn } from './../dialog-forms.styles'

const DeleteFormScheme = z.object({
  entityId: entityIdScheme,
})

type DeleteDialogFormValues = z.infer<typeof DeleteFormScheme>

type DeleteDialogFormProps = {
  entity?: DIALOG_ENTITY
  entityId: string
  name: string
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const DeleteDialogForm = ({
  entity = DIALOG_ENTITY.DECK,
  entityId,
  name,
  onOpenChange,
  open,
}: DeleteDialogFormProps) => {
  const navigate = useNavigate()
  const title = `Delete ${entity}`

  const [deleteCard, { isLoading: isLoadingDeleteCard }] = useDeleteCardMutation()
  const [deleteDeck, { isLoading: isLoadingDeleteDeck }] = useDeleteDeckMutation()

  const { handleSubmit } = useForm<DeleteDialogFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(DeleteFormScheme),
  })

  const formHandler = handleSubmit(() => {
    if (entity === DIALOG_ENTITY.CARD) {
      deleteCard({ id: entityId })
        .unwrap()
        .then(() => {
          toast.success('Card was successfully deleted')
          cancelFormHandler()
        })
        .catch(e => {
          const errors = getErrorMessageData(e)

          toast.error(errors as any)
        })
    }
    deleteDeck({ id: entityId })
      .unwrap()
      .then(() => {
        toast.success('Deck was successfully deleted')
        cancelFormHandler()
      })
      .then(() => navigate(PATH.DECK_LIST))
      .catch(e => {
        const errors = getErrorMessageData(e)

        toast.error(errors as any)
      })
  })

  const cancelFormHandler = () => {
    onOpenChange(false)
  }

  const isLoading = isLoadingDeleteCard || isLoadingDeleteDeck
  const disabled = useDisableOnLoading(isLoading)

  return (
    <Dialog modal onOpenChange={onOpenChange} open={open}>
      <DialogContent className={cn.container}>
        <Header load={isLoading} title={title} />
        <Description>
          {`Do you really want to remove ${entity}:  `}
          <b>{name}</b>
          {`?`}
          <br />
          {entity === DIALOG_ENTITY.DECK ? 'All cards will be deleted.' : ''}
        </Description>
        <form className={cn.form} onSubmit={formHandler}>
          <Footer
            disabled={disabled}
            onCancel={cancelFormHandler}
            onSubmit={formHandler}
            title={title}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}
