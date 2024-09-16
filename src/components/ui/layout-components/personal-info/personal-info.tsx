import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

import { EditOutline, EmailOk, LogOut, TrashOutline } from '@/assets/icons'
import { CheckEmail, VerifyHint } from '@/components/ui/layout-components'
import { Avatar, Button, Card, Typography } from '@/components/ui/primitives'
import { User, useResendVerifyEmailMutation } from '@/services'
import { SCREEN_SIZE } from '@/shared/enums'
import { useCurrentScreenWidth } from '@/shared/hooks'
import { FlexContainer } from '@/shared/ui/flex-container'
import { getErrorMessageData } from '@/shared/utils'

import { cn } from './personal-info.styles'

type PersonalInfoProps = {
  deleteAvatar: () => void
  deleteUser: () => void
  editName: () => void
  logout: () => void
  uploadAvatar: (e: ChangeEvent<HTMLInputElement>) => void
  userData: User
}

export const PersonalInfo = ({
  deleteAvatar,
  deleteUser,
  editName,
  logout,
  uploadAvatar,
  userData,
}: PersonalInfoProps) => {
  const { avatar, email, id, isEmailVerified, name } = userData
  const currentScreenWidth = useCurrentScreenWidth()
  const breakpoint = SCREEN_SIZE.MOBILE_TINY
  const isTinyScreen = currentScreenWidth <= breakpoint

  const [resendVerifyEmail, { isSuccess }] = useResendVerifyEmailMutation()

  const resendVerifyEmailHandler = () => {
    resendVerifyEmail({ userId: id })
      .unwrap()
      .then(() => toast.success(`${name}, the letter has been resend to your email`))
      .catch(e => {
        const errors = getErrorMessageData(e)

        toast.error(errors as any)
        toast.info('Reload the page')
      })
  }

  if (isSuccess) {
    return <CheckEmail email={email} name={name} />
  }

  return (
    <Card className={cn.container}>
      <FlexContainer fd={'column'} gap={'12px'}>
        <Typography as={'h1'} className={cn.title} variant={'h1'}>
          Personal Information
        </Typography>
        <FlexContainer className={cn.wrapper}>
          <Avatar
            className={cn.avatar}
            name={name}
            size={isTinyScreen ? 'm' : 'l'}
            src={avatar ?? undefined}
          />
          <Button
            as={'label'}
            className={cn.editAvatar}
            title={'Edit Avatar'}
            variant={'secondary'}
          >
            <EditOutline className={cn.icon} />
            <input accept={'image/*'} hidden onChange={uploadAvatar} type={'file'} />
          </Button>
          <Button
            className={cn.deleteAvatar}
            onClick={deleteAvatar}
            title={'Delete Avatar'}
            variant={'secondary'}
          >
            <TrashOutline className={cn.icon} />
          </Button>
        </FlexContainer>
        <FlexContainer gap={'12px'} jc={'center'}>
          <Typography as={'h2'} variant={'h2'}>
            {name}
          </Typography>
          <Button onClick={editName} title={'Edit profile'} variant={'icon'}>
            <EditOutline className={cn.icon} />
          </Button>
        </FlexContainer>
        <FlexContainer gap={'10px'} jc={'center'}>
          <Typography gray>{email}</Typography>
          {isEmailVerified && <EmailOk />}
        </FlexContainer>
        {!isEmailVerified && <VerifyHint verify={resendVerifyEmailHandler} />}
        <FlexContainer gap={'10px'} jc={'center'}>
          <Button className={cn.bottom} fullWidth onClick={deleteUser} variant={'danger'}>
            <TrashOutline className={cn.icon} />
            <Typography variant={'subtitle2'}>Delete user</Typography>
          </Button>
          <Button className={cn.bottom} fullWidth onClick={logout} variant={'secondary'}>
            <LogOut className={cn.icon} />
            <Typography variant={'subtitle2'}>Logout</Typography>
          </Button>
        </FlexContainer>
      </FlexContainer>
    </Card>
  )
}
