import Image from 'next/image'

import classes from './BestDroppedItem.module.scss'

export const BestDroppedItem = () => {
  return (
    <div className={classes.bestDroppedItem}>
      <p className={classes.title}>Лучший дроп</p>

      <div className={classes.image}>
        <Image
          src='/placeholders/best-drop.png'
          width={199}
          height={73}
          alt='AK-47'
          quality={100}
        />
      </div>

      <div className={classes.info}>
        <div className={classes.infoLeft}>
          <p>AK-47</p>
          <p>Soul Dreamer</p>
        </div>

        <div className={classes.price}>
          <span>970.5</span>
          <Image src='/icons/logo-mini.svg' width={16.47} height={16.1} alt='Валюта' />
        </div>
      </div>
    </div>
  )
}
