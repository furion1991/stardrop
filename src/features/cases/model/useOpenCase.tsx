'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { openCase } from '../api/cases'

type UseOpenCaseProps = {
  onSuccess: ({ recievedItemId }: { recievedItemId: string }) => void
}

export const useOpenCase = ({ onSuccess }: UseOpenCaseProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: openCase,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ['me']
      })
      const recievedItemId = data.result
      onSuccess({ recievedItemId })
    }
  })
}
