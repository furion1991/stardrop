'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

import { CaseLootList, CaseBeforeOpen, CaseAfterOpen } from '@/widgets/cases'
import { PageActions } from '@/shared/ui'

import { CaseOpeningAnimation, useCase } from '@/entities/cases'
import { useUser } from '@/shared/hooks'
import { useOpenCase } from '@/features/cases'

import classes from './CasePage.module.scss'

type OpenCaseState = 'not-open' | 'opening' | 'opened'

export const CasePage = () => {
  const params = useParams<{ id: string }>()
  const caseId = params?.id

  const { user } = useUser()
  const [droppedLootItemId, setDroppedLootItemId] = useState('')
  const [openCaseState, setOpenCaseState] = useState<OpenCaseState>('not-open')
  const { data: caseData, isLoading: isCaseLoading } = useCase({ id: caseId ?? '' })

  const { mutate: openCase, isPending: isCaseOpening } = useOpenCase({
    onSuccess: ({ droppedLootItemId }) => {
      setDroppedLootItemId(droppedLootItemId)
      setOpenCaseState('opening')
    }
  })

  const handleCaseOpen = () => {
    if (!caseId || !user) return

    openCase({ caseId, userId: user.id })
  }

  return (
    <div className={classes.casePage}>
      <PageActions />

      <div className={classes.wrapper}>
        <div className={classes.title}>
          <h1>{caseData?.name}</h1>
          <p>Кейс</p>
        </div>

        {caseId && caseData ? (
          <div className={classes.caseOpen}>
            {openCaseState === 'not-open' ? (
              <CaseBeforeOpen
                caseData={{
                  id: caseId,
                  name: caseData.name,
                  openPrice: caseData.price,
                  image: caseData.image,
                  imageType: caseData.type
                }}
                onCaseOpen={handleCaseOpen}
                onCaseQuickOpen={handleCaseOpen}
              />
            ) : null}

            {openCaseState === 'opening' && droppedLootItemId ? (
              <div className={classes.caseRoulette}>
                <CaseOpeningAnimation
                  droppedItemId={droppedLootItemId}
                  lootItems={caseData.items}
                  onAnimationComplete={() => {
                    setOpenCaseState('opened')
                  }}
                />
              </div>
            ) : null}

            {openCaseState === 'opened' && droppedLootItemId ? (
              <CaseAfterOpen
                caseId={caseId}
                droppedItemId={droppedLootItemId}
                onCaseReopen={handleCaseOpen}
              />
            ) : null}
          </div>
        ) : null}

        <section className={classes.caseLoot}>
          <h2>Содержимое кейса</h2>

          <div className={classes.caseLootList}>
            {caseData ? <CaseLootList loot={caseData.items} /> : null}
          </div>
        </section>
      </div>
    </div>
  )
}
