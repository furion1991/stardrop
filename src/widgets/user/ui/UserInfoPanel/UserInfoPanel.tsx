'use client'

import Image from 'next/image'
import { useState } from 'react'

import { UserAvatarUpload, UserNameChange } from '@/features/user'
import { UserBalance } from '@/entities/user'
import { BestLootedItem } from '@/entities/loot'
import { FavoriteCase } from '@/entities/cases'

import { useUser } from '@/shared/hooks/useUser'

import classes from './UserInfoPanel.module.scss'

export const UserInfoPanel = () => {
  const { user } = useUser()
  const [isUserNameChangeInProcess, setUserNameChangeInProcess] = useState(false)

  const copyUserId = (id?: string) => {
    if (id) {
      navigator.clipboard.writeText(id)
    }
  }

  return (
    <div className={classes.userInfoPanel}>
      <div className={classes.avatar}>
        <Image src='/placeholders/avatar-big.png' width={140} height={140} alt='Аватарка' />

        <div className={classes.avatarUploadBtn}>
          <UserAvatarUpload />
        </div>
      </div>

      <div className={classes.userInfo}>
        <div className={classes.topLine}>
          {!isUserNameChangeInProcess ? (
            <div className={classes.userNameContainer}>
              <p className={classes.userName}>{user?.userName}</p>

              <button
                className={classes.userNameChangeBtn}
                type='button'
                onClick={() => {
                  setUserNameChangeInProcess(true)
                }}
              >
                Изменить
              </button>
            </div>
          ) : (
            <UserNameChange
              userName={user?.userName || ''}
              onUserNameSubmit={() => {
                setUserNameChangeInProcess(false)
              }}
            />
          )}

          <div className={classes.userId}>
            ID: <span>{user?.id}</span>
            <button
              type='button'
              onClick={() => {
                copyUserId(user?.id)
              }}
            >
              <Image src='/img/copy.png' width={12} height={12} alt='Копировать' />{' '}
            </button>
          </div>
        </div>

        <div className={classes.balance}>
          <UserBalance />
        </div>
      </div>

      <div className={classes.bestLootItem}>
        <BestLootedItem />
      </div>

      <div className={classes.favoriteCase}>
        <FavoriteCase />
      </div>
    </div>
  )
}
