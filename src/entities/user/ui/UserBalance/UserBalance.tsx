import Image from 'next/image'

import { Button } from '@/shared/ui'

import { useUser } from '@/shared/hooks/useUser'

import classes from './UserBalance.module.scss'

export const UserBalance = () => {
  const { user } = useUser()

  return (
    <div className={classes.userBalance}>
      <div className={classes.left}>
        <div className={classes.row}>
          <div className={classes.currencyIcon}>
            <Image src='/icons/wallet-gradient.svg' width={30} height={30} alt='Кошелёк' />
          </div>

          <span>{user?.currentBalance}</span>

          <Image src='/icons/logo-mini.svg' width={26.99} height={26.38} alt='Лого' />
        </div>

        <div className={classes.row}>
          <div className={classes.currencyIcon}>
            <Image src='/img/gem.png' width={22} height={24} alt='Гем' />
          </div>

          <span>20</span>
        </div>
      </div>

      <Button color='purple' borderRadius='medium'>
        Пополнить ›
      </Button>
    </div>
  )
}
