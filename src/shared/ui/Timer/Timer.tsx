'use client'

import { useEffect, useState } from 'react'
import cn from 'classnames'

import classes from './Timer.module.scss'

type Timer = {
  days: string | number
  hours: string | number
  minutes: string | number
  seconds: string | number
}

export const Timer = () => {
  const [expiryTime, setExpiryTime] = useState('15 jul 2026 18:00:00')
  const [countdownTime, setCountdownTime] = useState<Timer>({
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  })

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime()
      const currentTime = new Date().getTime()
      const remainingDayTime = countdownDateTime - currentTime
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24))
      const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60))
      const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000)

      setCountdownTime({
        days: totalDays,
        hours: totalHours,
        minutes: totalMinutes,
        seconds: totalSeconds
      })

      if (remainingDayTime < 0) {
        clearInterval(timeInterval)
        // setExpiryTime(false)
      }
    }, 1000)
  }

  useEffect(() => {
    countdownTimer()
  })

  return (
    <div className={classes.timer}>
      <div className={classes.field}>
        <p>{countdownTime.days}</p>
        <p>Дней</p>
      </div>

      <div className={classes.field}>
        <p>{countdownTime.hours}</p>
        <p>Часов</p>
      </div>

      <div className={classes.field}>
        <p>{countdownTime.minutes}</p>
        <p>Минут</p>
      </div>

      <div className={classes.field}>
        <p>{countdownTime.seconds}</p>
        <p>Секунд</p>
      </div>
    </div>
  )
}
