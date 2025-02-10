'use client'

import { useState } from 'react'

import { LatestOpenCasesFilter } from '@/features/cases'
import { LatestOpenCasesList } from '@/entities/cases'

import { useLatestOpenCases } from '../../model/useLatestOpenCases'

import classes from './LatestOpenCases.module.scss'

type Filter = 'top' | 'default'

export const LatestOpenCases = () => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>('top')

  const { cases } = useLatestOpenCases({ filter: selectedFilter })

  return (
    <div className={classes.latestOpenCases}>
      <div className={classes.latestOpenCasesFilter}>
        <LatestOpenCasesFilter filter={selectedFilter} onFilterChange={setSelectedFilter} />
      </div>

      <LatestOpenCasesList
        cases={
          cases?.length
            ? cases.map(({ userId, openedTimeStamp, item }) => ({
                key: `${userId}-${openedTimeStamp}`,
                image: item.image,
                name: item.name,
                rarity: item.rarity
              }))
            : []
        }
      />
    </div>
  )
}
