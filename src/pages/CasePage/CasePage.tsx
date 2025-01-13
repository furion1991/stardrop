import Image from 'next/image'

import { Case } from '@/widgets/cases'
import { LinkBack } from '@/shared/ui'

import classes from './CasePage.module.scss'

export type ParamsType = Promise<{ id: string }>

export const CasePage = async ({ params }: { params: ParamsType }) => {
  const { id: caseId } = await params

  if (!caseId) return null

  return (
    <div className={classes.casePage}>
      <LinkBack className={classes.linkBack} />

      <button type='button' className={classes.soundBtn}>
        <Image src='/icons/sound.svg' width={26} height={25} alt='Звук' />
      </button>

      <div className={classes.wrapper}>
        <Case id={caseId} />
      </div>
    </div>
  )
}
