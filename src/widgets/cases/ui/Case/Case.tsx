'use client'

import Image from 'next/image'
import cn from 'classnames'
import { useState } from 'react'

import { useCase } from '@/entities/cases'
import { CaseRecievedItem, convertRarity, LootItem } from '@/entities/loot'
import { CaseOpenActions } from '@/features/cases'
import { Button } from '@/shared/ui'

import { useAuth } from '@/shared/hooks/useAuth'
import { useAuthModal } from '@/shared/hooks/useAuthModal'
import { useUser } from '@/shared/hooks/useUser'

import classes from './Case.module.scss'

type CaseProps = {
  id: string
}

export const Case = ({ id }: CaseProps) => {
  const { isAuth } = useAuth()
  const { user } = useUser()
  const { openModal: openAuthModal } = useAuthModal()
  const { data: caseData, isLoading: isCaseLoading } = useCase({ id })

  const [lastRecievedItemId, setLastRecievedItem] = useState<string | null>(null)

  if (!caseData) return null

  const isBalanceNotEnough = isAuth && user && user.currentBalance < caseData.price
  const howMuchBalanceNotEnough = user ? caseData.price - user?.currentBalance : 0
  const balanceEnough = isAuth && user && user.currentBalance >= caseData.price

  return (
    <div className={classes.case}>
      <div className={classes.title}>
        <h1>{caseData.name}</h1>
        <p>Кейс</p>
      </div>

      {!lastRecievedItemId || isBalanceNotEnough ? (
        <div
          className={cn(classes.caseImage, {
            [classes.caseImageContainer]: balanceEnough
            // [classes.caseImageContainer]: true
          })}
        >
          <Image src={caseData.image} width={420} height={403} alt={caseData.name} />
        </div>
      ) : (
        <div className={classes.recievedItem}>
          <CaseRecievedItem itemId={lastRecievedItemId} />
        </div>
      )}

      <div className={classes.caseActions}>
        {!isAuth ? (
          <div className={classes.actionError}>
            <div className={cn(classes.redContainer, classes.notAuth)}>
              <p className={classes.uppercase}>Вы не авторизованы!</p>
              <p>Авторизуйтесь для открытия кейсов</p>
            </div>

            <Button boxShadow onClick={openAuthModal}>
              Войти
            </Button>
          </div>
        ) : null}

        {isBalanceNotEnough ? (
          <div className={classes.actionError}>
            <div className={cn(classes.redContainer, classes.notEnoughtBalance)}>
              <p className={classes.currency}>
                Не хватает {howMuchBalanceNotEnough}{' '}
                <Image src='/icons/logo-mini.svg' width={20} height={20} alt='Валюта' />
              </p>

              <p>Недостаточно средств для открытия кейса</p>
            </div>

            <Button color='purple' className={classes.balanceUpLink}>
              <Image src='/icons/wallet.svg' width={22} height={18} alt='Кошелёк' /> Пополнить
              баланс
            </Button>
          </div>
        ) : null}

        {balanceEnough ? (
          <div className={classes.openCaseActions}>
            <CaseOpenActions
              isReopen={Boolean(lastRecievedItemId)}
              caseId={caseData.id}
              casePrice={caseData.price}
              onCaseOpen={({ recievedItemId }) => {
                setLastRecievedItem(recievedItemId)
              }}
            />
          </div>
        ) : null}
      </div>

      <div className={classes.caseContent}>
        <h2>Содержимое кейса</h2>

        <ul className={classes.caseItemsList}>
          {caseData.items
            .sort((a, b) => b.rarity - a.rarity)
            .map(({ id, rarity, image, game, name }) => {
              return (
                <li key={id}>
                  <LootItem
                    game={game}
                    image={image}
                    name={name}
                    rarity={convertRarity(rarity)}
                    imageSize={{
                      width: 169,
                      height: 103,
                      style: {
                        width: '100%',
                        maxHeight: '103px'
                      }
                    }}
                  />
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}
