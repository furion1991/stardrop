'use client'

import Image from 'next/image'
import cn from 'classnames'
import { motion, useAnimation } from 'motion/react'
import { useEffect } from 'react'

import { LootRarity, LootRarityBox } from '@/entities/loot'

import classes from './CaseOpeningAnimation.module.scss'

type Loot = {
  id: string
  name: string
  rarity: LootRarity
  isVisible: boolean
  game: string
  image: string
}

type CaseOpeningAnimationProps = {
  droppedItemId: string
  lootItems: Loot[]
  onAnimationComplete: () => void
}

export const CaseOpeningAnimation = ({
  droppedItemId,
  lootItems,
  onAnimationComplete
}: CaseOpeningAnimationProps) => {
  const controls = useAnimation()

  useEffect(() => {
    const selectedCase = lootItems.findIndex(({ id }) => droppedItemId === id)

    const itemWidth = 280
    const containerWidth = 1486
    const gap = 20
    const totalItems = lootItems.length
    const blockWidth = itemWidth + gap
    const firstLoopDistance = totalItems * blockWidth
    const finalItemIdx = totalItems + selectedCase

    const calculateFinalPosition = (index: number) => {
      return -(index * blockWidth - (containerWidth / 2 - itemWidth / 2))
    }

    controls.start({
      x: [0, -firstLoopDistance, calculateFinalPosition(finalItemIdx)],
      transition: {
        duration: 10,
        times: [0, 0.5, 0.75, 1],
        ease: [[0.2, 0.6, 0.8, 0.9], 'easeOut', [1, 1, 1, 1]]
      }
    })
  }, [controls, lootItems])

  return (
    <div className={classes.caseOpeningAnimation}>
      <div className={classes.rouletteContainer}>
        <motion.ul
          className={classes.roulette}
          animate={controls}
          initial={{ x: 0 }}
          onAnimationComplete={onAnimationComplete}
        >
          {Array.from({ length: 3 }).flatMap((_, repeatIndex) => {
            return lootItems.map(({ id, image, name, rarity }) => {
              return (
                <LootRarityBox
                  key={`${id}-${repeatIndex}`}
                  rarity={rarity}
                  className={classes.lootItem}
                >
                  <Image src={image} width={140} height={140} alt={name} loading='eager' />

                  <p>{name}</p>
                </LootRarityBox>
              )
            })
          })}
        </motion.ul>
      </div>

      <div className={classes.triangles}>
        <div className={cn(classes.triangle, classes.triangleTop)}>
          <Image src='/icons/triangle-right.svg' width={28} height={28} alt='Треугольник' />
        </div>

        <div className={cn(classes.triangle, classes.triangleBottom)}>
          <Image src='/icons/triangle-right.svg' width={28} height={28} alt='Треугольник' />
        </div>
      </div>
    </div>
  )
}
