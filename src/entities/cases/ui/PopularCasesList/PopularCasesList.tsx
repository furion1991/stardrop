'use client'

import Link from 'next/link'

import { CasePreview } from '../CasePreview/CasePreview'

import { useCases } from '../../model/useCases'

export const PopularCasesList = () => {
  const { data: cases, isLoading: isCasesLoading } = useCases({
    // page: 1,
    // pageItems: 4
  })

  return (
    <>
      {cases?.map(({ id, name, image, price, oldPrice, openLimit }) => {
        return (
          <Link key={id} href={`/cases/${id}`}>
            <CasePreview
              name={name}
              image={image}
              price={price}
              oldPrice={oldPrice}
              openLimit={openLimit}
            />
          </Link>
        )
      })}
    </>
  )
}
