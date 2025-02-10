'use client'

import Image from 'next/image'
import cn from 'classnames'
import { useState } from 'react'

import { Button, PriceWithCurrency } from '@/shared/ui'

import { useAuth, useAuthModal } from '@/shared/hooks'

import classes from './UpgradeDevice.module.scss'

type Item = {
  id: string
  game: string
  name: string
  sellPrice: number
  image: string
  rarity: number
}

type UpgradeState = 'default' | 'loose' | 'win'

type UpgradeDeviceProps = {
  upgradeItem: Item | null
  itemToUpgrade: Item | null
}

export const UpgradeDevice = ({ upgradeItem, itemToUpgrade }: UpgradeDeviceProps) => {
  const { isAuth } = useAuth()
  const { openAuthModal } = useAuthModal()

  const [upgradeState, setUpgradeState] = useState<UpgradeState>('default')

  const handleUpgrade = () => {
    if (Math.random() < 0.5) {
      setUpgradeState('loose')
    } else {
      setUpgradeState('win')
    }
  }

  const getUpgradeStateImage = (state: UpgradeState) => {
    switch (state) {
      case 'default':
        return (
          <div className={classes.stateImg}>
            <Image
              src='/img/upgrades/upgrade-default-state.png'
              width={296}
              height={296}
              quality={100}
              priority
              alt='Состояние'
            />
          </div>
        )
      case 'loose':
        return (
          <div className={classes.stateImg} style={{ marginLeft: 2, top: 112 }}>
            <Image
              src='/img/upgrades/upgrade-loose.png'
              width={366}
              height={362}
              quality={100}
              priority
              alt='Проигрыш'
            />
          </div>
        )
      case 'win':
        return (
          <div className={classes.stateImg} style={{ marginLeft: -7, top: 140 }}>
            <Image
              src='/img/upgrades/upgrade-win.png'
              width={339}
              height={322}
              quality={100}
              priority
              alt='Победа'
            />
          </div>
        )
    }
  }

  return (
    <div className={classes.upgradeDevice}>
      <div className={classes.itemLeft}>
        <div className={classes.ufo}>
          <Image
            src='/img/upgrades/ufo-left.png'
            width={380}
            height={422}
            quality={100}
            priority
            alt='НЛО'
          />
        </div>

        {upgradeItem ? (
          <div className={classes.itemPlaceholder}>
            <Image src={upgradeItem.image} width={163} height={143} alt={upgradeItem.name} />

            <p>{upgradeItem.name}</p>
          </div>
        ) : (
          <div className={classes.itemPlaceholder}>
            <Image
              src='/img/upgrades/upgrade-gun-placeholder.svg'
              width={163}
              height={143}
              alt='Пистолет'
            />

            <p>Выберите предмет с вашего инвентаря</p>
          </div>
        )}
      </div>

      <div className={classes.main}>
        <div className={classes.mainBg}>
          <Image
            src='/img/upgrades/upgrade-device-main-bg.png'
            width={781}
            height={847}
            quality={100}
            priority
            alt='Главный фон'
          />

          {getUpgradeStateImage(upgradeState)}
        </div>

        <div className={classes.upgradeInfo}>
          <div className={classes.indicator}>
            <p>0.00%</p>
            <p>Шанс апгрейда</p>
          </div>

          <div className={classes.indicator}>
            <p>0.00x</p>
            <p>Коэффициент</p>
          </div>
        </div>

        <div className={cn(classes.action, classes.needAuth)}>
          {isAuth ? (
            upgradeItem && itemToUpgrade ? (
              <Button boxShadow className={classes.upgradeBtn} onClick={handleUpgrade}>
                Апгрейд
              </Button>
            ) : null
          ) : (
            <>
              <p>Для апгрейда необходимо авторизоваться</p>

              <Button className={classes.authBtn} boxShadow onClick={openAuthModal}>
                Войти
              </Button>
            </>
          )}
        </div>
      </div>

      <div className={classes.itemRight}>
        <div className={classes.ufo}>
          <Image
            src='/img/upgrades/ufo-right.png'
            width={380}
            height={422}
            quality={100}
            priority
            alt='НЛО'
          />
        </div>

        {itemToUpgrade ? (
          <div className={classes.itemPlaceholder}>
            <Image src={itemToUpgrade.image} width={163} height={143} alt={itemToUpgrade.name} />

            <p>{itemToUpgrade.name}</p>

            {upgradeState === 'win' ? (
              <Button className={classes.sellItemBtn} color='purple'>
                Продать за
                <PriceWithCurrency>{itemToUpgrade.sellPrice}</PriceWithCurrency>
              </Button>
            ) : null}
          </div>
        ) : (
          <div className={classes.itemPlaceholder}>
            <Image
              src='/img/upgrades/upgrade-gun-placeholder.svg'
              width={163}
              height={143}
              alt='Пистолет'
            />

            <p>Выберите предмет для апгрейда</p>
          </div>
        )}
      </div>
    </div>
  )
}
