import Image from 'next/image'

import { LinkBack } from '../LinkBack/LinkBack'

import classes from './PageActions.module.scss'

export const PageActions = () => {
  return (
    <div className={classes.pageActions}>
      <LinkBack className={classes.linkBack} />

      <button type='button' className={classes.soundBtn}>
        <Image src='/icons/sound.svg' width={26} height={25} alt='Звук' />
      </button>
    </div>
  )
}
