'use client'

import Image from 'next/image'
import { useState } from 'react'
import cn from 'classnames'

import { Button } from '@/shared/ui'

import { useOpenCase } from '../../model/useOpenCase'
import { useUser } from '@/shared/hooks/useUser'

import classes from './CaseOpenActions.module.scss'
import { useCaseItem } from '@/entities/loot'

type CaseOpenActionsProps = {
  caseId: string
  isReopen: boolean
  casePrice: number
  onCaseOpen: ({ recievedItemId }: { recievedItemId: string }) => void
}

export const CaseOpenActions = ({
  caseId,
  isReopen,
  casePrice,
  onCaseOpen
}: CaseOpenActionsProps) => {
  const [selectedQuantityNumber, setSelectedQuantityNumber] = useState(1)
  const [recievedItemId, setRecievedItemId] = useState<string | null>(null)

  const { user } = useUser()
  const { mutate: openCase, isPending: isCaseOpening } = useOpenCase({
    onSuccess: ({ recievedItemId }) => {
      onCaseOpen({ recievedItemId })
      setRecievedItemId(recievedItemId)
    }
  })

  const { data: recievedItem } = useCaseItem({
    itemId: recievedItemId ?? '',
    enabled: Boolean(recievedItemId)
  })

  const quantityOptions = [
    { label: 'X1', value: 1 },
    { label: 'X2', value: 2 },
    { label: 'X3', value: 3 },
    { label: 'X4', value: 4 },
    { label: 'X5', value: 5 }
  ]

  return (
    <div className={classes.caseOpenActions}>
      {!isReopen ? (
        <>
          <ul className={classes.quantitySelectorList}>
            {quantityOptions.map(({ label, value }) => {
              return (
                <li key={value}>
                  <button
                    type='button'
                    className={cn(classes.quantityBtn, {
                      [classes.quantityBtnActive]: selectedQuantityNumber === value
                    })}
                    onClick={() => {
                      setSelectedQuantityNumber(value)
                    }}
                  >
                    {label}
                  </button>
                </li>
              )
            })}
          </ul>

          <Button className={classes.openBtn} type='button' boxShadow>
            Открыть за {casePrice}{' '}
            <Image src='/icons/logo-mini.svg' width={25} height={24} alt='Валюта' />
          </Button>

          <Button
            className={classes.quickOpenBtn}
            type='button'
            color='purple'
            boxShadow
            disabled={isCaseOpening}
            onClick={() => {
              if (!user) return

              openCase({ caseId, userId: user.id })
            }}
          >
            <Image src='/icons/thunder.svg' width={15} height={24} alt='Валюта' />
            Быстрое открытие
          </Button>
        </>
      ) : (
        <div className={classes.caseReopenActions}>
          <Button
            color='purple'
            onClick={() => {
              if (!user) return

              openCase({ caseId, userId: user.id })
            }}
          >
            <Image src='/icons/reload.svg' width={26} height={26} alt='Перезагрузить' /> Попробовать
            ещё раз
          </Button>

          <Button>
            Продать за {recievedItem?.data.sellPrice}{' '}
            <Image src='/icons/logo-mini.svg' width={20} height={20} alt='Валюта' />{' '}
          </Button>

          <Button color='cyan'>
            <Image src='/icons/medal.svg' width={37} height={37} alt='Медаль' />
            Добавить в контракт
          </Button>
        </div>
      )}
    </div>
  )
}
