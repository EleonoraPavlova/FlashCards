import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'
import { Option } from '@/types'
import * as RadixRadio from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radio.module.scss'

type Props = {
  options: Option[]
} & ComponentPropsWithoutRef<typeof RadixRadio.Root>
type PropsRef = ElementRef<typeof RadixRadio.Root>

export const RadioGroup = forwardRef<PropsRef, Props>((props, ref) => {
  const { className, disabled, options, ...rest } = props
  const cn = {
    disabled: clsx(s.disabled),
    indicator: clsx(s.indicator),
    item: clsx(s.item),
    label: clsx(s.label, disabled && s.disabled),
    root: clsx(s.root, className),
    wrapper: clsx(s.wrapper),
  }

  const defaultOption = options.find(i => i.defaultValue)?.value || options[0].value

  return (
    <RadixRadio.Root className={cn.root} defaultValue={defaultOption} ref={ref} {...rest}>
      {options.map(i => (
        <div className={cn.wrapper} key={i.id}>
          <RadixRadio.Item className={cn.item} disabled={i.disabled} id={i.id} value={i.value}>
            <RadixRadio.Indicator className={cn.indicator} />
          </RadixRadio.Item>
          <Typography as={'label'} className={cn.label} htmlFor={i.id} variant={'body2'}>
            {i.label}
          </Typography>
        </div>
      ))}
    </RadixRadio.Root>
  )
})
