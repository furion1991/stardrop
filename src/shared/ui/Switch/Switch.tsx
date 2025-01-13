'use client'

import { useFormContext } from 'react-hook-form'

import classes from './Switch.module.scss'

type SwitchProps = {
  name: string
}

export const Switch = ({ name }: SwitchProps) => {
  const { register } = useFormContext()

  return (
    <label className={classes.switch}>
      <input type='checkbox' {...register(name)} defaultChecked />
      <span className={classes.slider}></span>
    </label>
  )
}
