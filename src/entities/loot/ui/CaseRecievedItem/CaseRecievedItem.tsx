'use client'

import Image from 'next/image'
import cn from 'classnames'

import { LootRarityBox } from '../LootRarityBox/LootRarityBox'
import { Button } from '@/shared/ui'

import { useCaseItem } from '../../model/useCaseItem'
import { convertRarity } from '../../utils/convertRarity'

import classes from './CaseRecievedItem.module.scss'

type CaseRecievedItemProps = {
  itemId: string | null
}

export const CaseRecievedItem = ({ itemId }: CaseRecievedItemProps) => {
  const { data: recievedItem, isLoading: isRecievedItemLoading } = useCaseItem({
    itemId: itemId ?? '',
    enabled: Boolean(itemId)
  })

  if (isRecievedItemLoading || !recievedItem) return null

  return (
    <LootRarityBox
      className={classes.caseRecievedItem}
      rarity={convertRarity(recievedItem.data.rarity)}
    >
      <Image src={recievedItem.data.image} width={158} height={121} alt={recievedItem.data.name} />

      <p className={classes.game}>{recievedItem.data.game}</p>

      <p className={classes.name}>{recievedItem.data.name}</p>

      <Button className={classes.sellBtn}>Продать</Button>

      <div className={classes.triangles}>
        <div className={cn(classes.triangle, classes.triangleLeft)}>
          <Image src='/icons/triangle-right.svg' width={28} height={28} alt='Треугольник' />
        </div>

        <div className={cn(classes.triangle, classes.triangleRight)}>
          <Image src='/icons/triangle-right.svg' width={28} height={28} alt='Треугольник' />
        </div>
      </div>
    </LootRarityBox>
  )
}
