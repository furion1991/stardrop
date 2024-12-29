'use client'

import { CasePreview } from '../CasePreview/CasePreview'

import { useCases } from '../../model/useCases'

export const PopularCasesList = () => {
  const { data: cases, isLoading: isCasesLoading } = useCases()

  // console.log(cases)

  // const casesList = Array.from({ length: 5 })
  //   .fill(null)
  //   .map((_, idx) => ({
  //     id: idx,
  //     name: 'Мрачный ронин',
  //     price: Math.floor(Math.random() * 10_000),
  //     oldPrice: Math.floor(Math.random() * 100_000)
  //   }))

  return (
    <>
      {cases?.map(({ id, name, baseCost, sellPrice, image }) => {
        return (
          <CasePreview key={id} name={name} image={image} price={sellPrice} oldPrice={baseCost} />
        )
      })}
    </>
  )
}
