'use client'

import { useSignalR } from '@/shared/hooks'
import { SignalRKeys } from '@/shared/hooks/useSignalR'

export const useCasesOpenedNumber = () => {
  const { data: casesOpenedNumber } = useSignalR<number>(SignalRKeys.CASES_OPENED_NUMBER)

  return {
    casesOpenedNumber
  }
}
