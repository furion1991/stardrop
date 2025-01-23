'use client'

import { useState } from 'react'
import Image from 'next/image'
import cn from 'classnames'

import classes from './AccordionItem.module.scss'

type AccordionItemProps = {
  question: string
  answer: string
}

export const AccordionItem = ({ question, answer }: AccordionItemProps) => {
  const [isOpen, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen((isOpen) => !isOpen)
  }

  return (
    <div className={classes.accordionItem}>
      <div
        className={cn(classes.accordionHeading, {
          [classes.open]: isOpen
        })}
        onClick={toggleOpen}
      >
        <p>{question}</p>

        <button type='button' className={classes.accordionToggler}>
          <Image src='/icons/arrow-down-gray.svg' width={16} height={6} alt='Стрелка' />
        </button>
      </div>

      <div
        className={cn(classes.accordionContent, {
          [classes.open]: isOpen
        })}
      >
        <p>{answer}</p>
      </div>
    </div>
  )
}
