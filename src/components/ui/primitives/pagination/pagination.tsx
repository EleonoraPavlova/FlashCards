import { ArrowBack } from '@/assets/icons'
import { Button, Typography } from '@/components/ui/primitives'
import { DOTS, usePagination } from '@/components/ui/primitives/pagination/hooks/usePagination'
import { Select } from '@/components/ui/primitives/select'
import { useSearchParamUpdater } from '@/shared/hooks'
import clsx from 'clsx'

import s from './pagination.module.scss'

type PaginationProps = {
  className?: string
  currentPage: number
  pageSize?: number
  siblingCount?: number
  totalCount: number
}

export const Pagination = ({
  className,
  currentPage,
  pageSize = 10,
  siblingCount = 1,
  totalCount = 1,
}: PaginationProps) => {
  const updateSearchParam = useSearchParamUpdater()

  const totalPageCount = Math.ceil(totalCount / pageSize)

  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
    totalPageCount,
  })

  const nextPageHandler = () => {
    updateSearchParam({ currentPage: currentPage + 1 })
  }

  const previousPageHandler = () => {
    updateSearchParam({ currentPage: currentPage - 1 })
  }

  const changePageHandler = (page: number) => {
    updateSearchParam({ currentPage: page })
  }

  const changeDisplayPagesHandler = (pageSize: string) => {
    updateSearchParam({ currentPage: 1, itemsPerPage: pageSize })
  }

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPageCount

  const cn = {
    arrow: s.arrow,
    arrowRight: clsx(s.arrow, s.arrowRight),
    container: clsx(s.paginationContainer, className),
    dots: clsx(s.paginationOption, s.dots),
    nowrap: s.nowrap,
    option: s.paginationOption,
    select: s.selectOption,
    selectedOption: clsx(s.paginationOption, s.selected),
  }

  const options = paginationRange.map((el, index) => {
    const key = `${el}${index}`
    const isOptionSelected = el === currentPage ? cn.selectedOption : cn.option

    // If the pageItem is a DOT, render the DOTS unicode character
    if (el === DOTS) {
      return (
        <Typography as={'span'} className={cn.dots} key={key}>
          &#8230;
        </Typography>
      )
    }

    return (
      <Button className={isOptionSelected} key={key} onClick={() => changePageHandler(+el)}>
        <Typography as={'span'} className={clsx(s.nowrap, isOptionSelected)}>
          {el}
        </Typography>
      </Button>
    )
  })

  return (
    <div className={cn.container}>
      <Button disabled={isFirstPage} onClick={previousPageHandler} variant={'icon'}>
        <ArrowBack className={cn.arrow} />
      </Button>
      {options}
      <Button disabled={isLastPage} onClick={nextPageHandler} variant={'icon'}>
        <ArrowBack className={cn.arrowRight} />
      </Button>
      <Typography as={'span'} className={cn.nowrap}>
        Show
      </Typography>
      <Select
        className={cn.select}
        defaultValue={'10'}
        onValueChange={changeDisplayPagesHandler}
        value={`${pageSize}`}
      />
      <Typography as={'span'} className={cn.nowrap}>
        on the page
      </Typography>
    </div>
  )
}
