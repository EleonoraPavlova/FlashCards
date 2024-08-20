import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/primitives'
import clsx from 'clsx'

import s from './table.module.scss'

type TableProps = {
  label?: string
} & ComponentPropsWithoutRef<'table'>

type TableRef = ElementRef<'table'>

const Table = forwardRef<TableRef, TableProps>((props, ref) => {
  const { children, className, ...rest } = props
  const cn = clsx(s.table, className)

  return (
    <table className={cn} ref={ref} {...rest}>
      {children}
    </table>
  )
})

type TheadProps = ComponentPropsWithoutRef<'thead'>
type TheadRef = ElementRef<'thead'>

const Thead = forwardRef<TheadRef, TheadProps>((props, ref) => {
  const { children, className, ...rest } = props
  const cn = clsx(className)

  return (
    <thead className={cn} ref={ref} {...rest}>
      {children}
    </thead>
  )
})

type TrProps = ComponentPropsWithoutRef<'tr'>
type TrRef = ElementRef<'tr'>

const Tr = forwardRef<TrRef, TrProps>((props, ref) => {
  const { children, className, ...rest } = props
  const cn = clsx(s.Tr, className)

  return (
    <tr className={cn} ref={ref} {...rest}>
      {children}
    </tr>
  )
})

type ThProps = ComponentPropsWithoutRef<'th'>
type ThRef = ElementRef<'th'>

const Th = forwardRef<ThRef, ThProps>((props, ref) => {
  const { children, className, ...rest } = props
  const cn = clsx(s.headerCell, className)

  return (
    <th className={cn} ref={ref} {...rest}>
      <Typography as={'span'} variant={'subtitle2'}>
        {children}
      </Typography>
    </th>
  )
})

type TbodyProps = ComponentPropsWithoutRef<'tbody'>
type TbodyRef = ElementRef<'tbody'>

const Tbody = forwardRef<TbodyRef, TbodyProps>((props, ref) => {
  const { children, className, ...rest } = props
  const cn = clsx(s.Td, className)

  return (
    <tbody className={cn} ref={ref} {...rest}>
      {children}
    </tbody>
  )
})

type TdProps = ComponentPropsWithoutRef<'td'>
type TdRef = ElementRef<'td'>

const Td = forwardRef<TdRef, TdProps>((props, ref) => {
  const { children, className, ...rest } = props
  const cn = clsx(s.Td, className)

  return (
    <td className={cn} ref={ref} {...rest}>
      <Typography as={'span'}>{children}</Typography>
    </td>
  )
})

export { Table, Tbody, Td, Th, Thead, Tr }
