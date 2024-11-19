import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

type InferType<T> = T extends ElementType<infer U> ? U : never

type Props<T extends ElementType = 'button'> = {
  as?: T
  fullWidth?: boolean
  variant?: 'danger' | 'icon' | 'link' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(props: Props<T>, ref: ForwardedRef<InferType<T>>) => {
    const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

    const cn = clsx(s.button, s[variant], className, fullWidth && s.fullWidth)

    return <Component className={cn} ref={ref} {...rest} />
  }
)
