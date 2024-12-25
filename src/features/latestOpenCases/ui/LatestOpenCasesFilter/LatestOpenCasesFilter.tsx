'use client'

import Image from 'next/image'
import { useState } from 'react'
import cn from 'classnames'

import classes from './LatestOpenCasesFilter.module.scss'

type Filter = 'top' | 'all'

export const LatestOpenCasesFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>('top')

  return (
    <div className={classes.latestOpenCasesFilter}>
      <div
        className={cn(classes.btnWrapper, {
          [classes.btnActive]: selectedFilter === 'top'
        })}
        onClick={() => {
          setSelectedFilter('top')
        }}
      >
        <button>
          <Image src='/icons/crown.svg' width={27} height={27} alt='Корона' />
          <span>Топ</span>
        </button>
      </div>

      <div
        className={cn(classes.btnWrapper, {
          [classes.btnActive]: selectedFilter === 'all'
        })}
        onClick={() => {
          setSelectedFilter('all')
        }}
      >
        <button>
          <Image src='/icons/layout-grid.svg' width={16} height={16} alt='Сетка' />
          <span>Все</span>
        </button>
      </div>
    </div>
  )
}
