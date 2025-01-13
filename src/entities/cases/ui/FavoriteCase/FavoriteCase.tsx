import Image from 'next/image'

import { Button } from '@/shared/ui'

import classes from './FavoriteCase.module.scss'

export const FavoriteCase = () => {
  return (
    <div className={classes.favoriteCase}>
      <p>Любимый кейс</p>

      <p>PALPATINE</p>

      <Button type='button' borderRadius='medium'>
        Открыть
      </Button>

      <div className={classes.caseBg}>
        <Image src='/placeholders/favorite-case-back.png' width={180} height={207} alt='фон' />
      </div>

      <div className={classes.caseImage}>
        <Image
          src='/placeholders/favorite-case.png'
          width={207}
          height={183}
          alt='Кейс Palpatine'
          quality={100}
        />
      </div>
    </div>
  )
}
