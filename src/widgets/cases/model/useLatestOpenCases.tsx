'use client'

import { useSignalR } from '@/shared/hooks'
import { SignalRKeys } from '@/shared/hooks/useSignalR'

import { LastOpenedCase } from '../types/cases.types'

type UseLatestOpenCasesProps = {
  filter: 'default' | 'top'
}

export const useLatestOpenCases = ({ filter }: UseLatestOpenCasesProps) => {
  const { data: cases } = useSignalR<LastOpenedCase[]>(SignalRKeys.LAST_OPENED_CASES)
  const { data: topCases } = useSignalR<LastOpenedCase[]>(SignalRKeys.LAST_OPENED_CASES_TOP)

  if (filter === 'default') {
    return {
      cases
    }
  }

  if (filter === 'top') {
    return {
      cases: topCases
    }
  }

  return { cases }
}
