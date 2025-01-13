'use client'

import { useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'
import Link from 'next/link'

import { InventoryLootList } from '@/entities/inventory'
import { InventoryLootActions } from '@/features/inventory'
import { UpgradesHistoryList } from '@/entities/upgrades'
import { ContractsHistoryList } from '@/entities/contracts'
import { WithdrawnItemsList } from '@/entities/withdrawals'
import { Button, NoDataPanel } from '@/shared/ui'

import classes from './UserHistory.module.scss'

export const UserHistory = () => {
  const [tab, setTab] = useState('inventory')

  const tabs = [
    {
      label: 'Мой инвентарь',
      value: 'inventory',
      iconPath: '/icons/chest-blue.svg',
      iconActivePath: '/icons/chest-gradient.svg'
    },
    {
      label: 'Апгрейды',
      value: 'upgrades',
      iconPath: '/icons/upgrade-blue.svg',
      iconActivePath: '/icons/upgrade-gradient.svg'
    },
    {
      label: 'Контракты',
      value: 'contracts',
      iconPath: '/icons/medal-blue.svg',
      iconActivePath: '/icons/medal-gradient.svg'
    },
    {
      label: 'Выводы',
      value: 'withdrawals',
      iconPath: '/icons/clock-blue.svg',
      iconActivePath: '/icons/clock-gradient.svg'
    }
  ]

  return (
    <div className={classes.userHistory}>
      <div className={classes.tabPanel}>
        <ul className={classes.tabBtnsList}>
          {tabs.map(({ label, value, iconPath, iconActivePath }) => {
            const isActive = tab === value

            return (
              <li key={value}>
                <button
                  type='button'
                  className={cn(classes.tabBtn, {
                    [classes.tabBtnActive]: isActive
                  })}
                  onClick={() => {
                    setTab(value)
                  }}
                >
                  <Image src={iconPath} width={25} height={25} alt={label} />

                  <Image
                    className={cn(classes.tabActiveIcon)}
                    src={iconActivePath}
                    width={25}
                    height={25}
                    alt={label}
                  />

                  <span>{label}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <div className={classes.inventoryLootActions}>
          {tab === 'inventory' ? <InventoryLootActions /> : null}
        </div>
      </div>

      <div className={classes.tabContent}>
        {tab === 'inventory' ? <InventoryLootList /> : null}
        {tab === 'upgrades' ? <UpgradesHistoryList /> : null}
        {tab === 'contracts' ? <ContractsHistoryList /> : null}
        {tab === 'withdrawals' ? <WithdrawnItemsList /> : null}
      </div>

      {/* <NoDataPanel
        title='У вас нет предметов'
        text='Начните открывать кейсы'
        action={
          <Link href='/'>
            <Button>Открыть ›</Button>
          </Link>
        }
      />

      <NoDataPanel
        title='У вас нет апгрейдов'
        text='Создайте свой первый апгрейд'
        action={
          <Link href='/'>
            <Button>Апгрейды ›</Button>
          </Link>
        }
      />

      <NoDataPanel
        title='У вас нет контрактов'
        text='Создайте свой первый контракт'
        action={
          <Link href='/'>
            <Button>Контракты ›</Button>
          </Link>
        }
      /> */}
    </div>
  )
}
