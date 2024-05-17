"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'

type PaginationProps = {  
  page: number | string,
  totalPages: number,
  urlParamName?: string
}

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClick = (btnType: string) => {
    const pageValue = btnType === 'next' 
      ? Number(page) + 1 
      : Number(page) - 1

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    })

    router.push(newUrl, {scroll: false})
  }

  return (
    <div className="flex gap-2 mt-8">
      <Button
        size="lg"
        variant="outline"
        className="w-28 text-lg border-slate-400 border-2"
        onClick={() => onClick('prev')}
        disabled={Number(page) <= 1}
      >
        &#x3c; Previous
      </Button>
      <p className='flex self-center mx-4'>
        {`${page}/${totalPages}`}
      </p>
      <Button
        size="lg"
        variant="outline"
        className="w-28 text-lg border-slate-400 border-2"
        onClick={() => onClick('next')}
        disabled={Number(page) >= totalPages}
      >
        Next &#x3e;
      </Button>
    </div>
  )
}

export default Pagination