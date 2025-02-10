'use client'

import { useState } from 'react'
import { CaseOpeningCondition, CasePreviewOpen } from '@/entities/cases'

import { useAuth, useUser } from '@/shared/hooks'
import { CaseOpenActions } from '@/features/cases'

import classes from './CaseBeforeOpen.module.scss'

type CaseData = {
  id: string
  openPrice: number
  name: string
  image: string
}

type CaseBeforeOpenProps = {
  caseData: CaseData
  onCaseOpen: () => void
  onCaseQuickOpen: () => void
}

export const CaseBeforeOpen = ({ caseData, onCaseOpen, onCaseQuickOpen }: CaseBeforeOpenProps) => {
  const [casesToOpenQunatity, setCasesToOpenQunatity] = useState(1)

  const { isAuth } = useAuth()
  const { user } = useUser()

  const isBalanceNotEnough = user && user.currentBalance < caseData.openPrice ? true : false

  const getCaseOpeningCondition = (isAuth: boolean, isBalanceNotEnough: boolean) => {
    if (!isAuth) {
      return 'not-auth' as const
    }

    if (isBalanceNotEnough) {
      return 'not-enough-balance' as const
    }
  }

  const caseOpeningConidtion = getCaseOpeningCondition(isAuth, isBalanceNotEnough)

  return (
    <div className={classes.сaseBeforeOpen}>
      <CasePreviewOpen
        caseName={caseData.name}
        hasBoxBg={casesToOpenQunatity !== 1}
        previewImage={caseData.image}
        previewsNumber={casesToOpenQunatity}
      />

      {caseOpeningConidtion ? (
        <div className={classes.caseOpeningCondition}>
          <CaseOpeningCondition
            condition={caseOpeningConidtion}
            caseOpenPrice={caseData.openPrice}
          />
        </div>
      ) : (
        <div className={classes.caseOpenActions}>
          <CaseOpenActions
            casesQuantity={casesToOpenQunatity}
            casePrice={caseData.openPrice}
            onCaseOpen={onCaseOpen}
            onCaseQuickOpen={onCaseQuickOpen}
            onCasesQuantityChange={setCasesToOpenQunatity}
          />
        </div>
      )}
    </div>
  )
}
