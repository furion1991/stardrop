'use client'

import { useEffect, useState } from 'react'

import { LatestOpenCasesFilter } from '@/features/cases'
import { LatestOpenCasesList } from '@/entities/cases'

import { useLatestOpenCases } from '../../model/useLatestOpenCases'

import classes from './LatestOpenCases.module.scss'

import { LootRarity } from '@/entities/loot'

type Filter = 'top' | 'default'

type Case = {
  key: string
  image: string
  name: string
  rarity: LootRarity
}

export const LatestOpenCases = () => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>('top')

  const { cases: casesByTop } = useLatestOpenCases({ filter: 'top' })
  const { cases: casesByDefault } = useLatestOpenCases({ filter: 'default' })

  const [itemsTop, setItemsTop] = useState<Case[]>([])
  const [itemsDefault, setItemsDefault] = useState<Case[]>([])

  useEffect(() => {
    setItemsTop(
      casesByTop
        ? casesByTop.map(({ userId, openedTimeStamp, item }) => ({
            key: `${userId}-${openedTimeStamp}`,
            image: item.image,
            name: item.name,
            rarity: item.rarity
          }))
        : []
    )
  }, [casesByTop])

  useEffect(() => {
    setItemsDefault(
      casesByDefault
        ? casesByDefault.map(({ userId, openedTimeStamp, item }) => ({
            key: `${userId}-${openedTimeStamp}`,
            image: item.image,
            name: item.name,
            rarity: item.rarity
          }))
        : []
    )
  }, [casesByDefault])

  const addItem = () => {
    if (selectedFilter === 'top') {
      setItemsTop((prevItems) => [
        { ...prevItems[prevItems.length - 1], key: String(Math.floor(Math.random() * 10000)) },
        ...prevItems
      ])
    }

    if (selectedFilter === 'default') {
      setItemsDefault((prevItems) => [
        { ...prevItems[prevItems.length - 1], key: String(Math.floor(Math.random() * 10000)) },
        ...prevItems
      ])
    }
  }

  return (
    <div className={classes.latestOpenCases}>
      <div className={classes.latestOpenCasesFilter}>
        <LatestOpenCasesFilter filter={selectedFilter} onFilterChange={setSelectedFilter} />
      </div>

      <button className={classes.btn} onClick={addItem}>
        Пополнить
      </button>

      {selectedFilter === 'top' && itemsTop.length ? (
        <LatestOpenCasesList cases={itemsTop} />
      ) : null}

      {selectedFilter === 'default' && itemsDefault.length ? (
        <LatestOpenCasesList cases={itemsDefault} />
      ) : null}
    </div>
  )
}
