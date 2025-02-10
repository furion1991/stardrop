'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useParams } from 'next/navigation'

import { CaseLootList, CaseBeforeOpen, CaseAfterOpen } from '@/widgets/cases'
import { LinkBack, PageActions } from '@/shared/ui'

import { useCase } from '@/entities/cases'
import { useUser } from '@/shared/hooks'
import { useOpenCase } from '@/features/cases'

import classes from './CasePage.module.scss'

export const CasePage = () => {
  const params = useParams<{ id: string }>()
  const caseId = params?.id

  const { user } = useUser()
  const [droppedLootItemId, setDroppedLootItemId] = useState('')
  const { data: caseData, isLoading: isCaseLoading } = useCase({ id: caseId ?? '' })

  const { mutate: openCase, isPending: isCaseOpening } = useOpenCase({
    onSuccess: ({ droppedLootItemId }) => {
      setDroppedLootItemId(droppedLootItemId)
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
            {!droppedLootItemId ? (
              <CaseBeforeOpen
                caseData={{
                  id: caseId,
                  name: caseData.name,
                  openPrice: caseData.price,
                  image: caseData.image
                }}
                onCaseOpen={handleCaseOpen}
                onCaseQuickOpen={handleCaseOpen}
              />
            ) : (
              <CaseAfterOpen
                caseId={caseId}
                droppedItemId={droppedLootItemId}
                onCaseReopen={handleCaseOpen}
              />
            )}
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
