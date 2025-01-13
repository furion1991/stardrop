import { UpgradeItem } from '../UpgradeItem/UpgradeItem'

import classes from './UpgradesHistoryList.module.scss'

export const UpgradesHistoryList = () => {
  const upgrades = [
    { id: 0, result: 'success' as const },
    { id: 1, result: 'failure' as const },
    { id: 2, result: 'success' as const },
    { id: 3, result: 'failure' as const },
    { id: 4, result: 'success' as const },
    { id: 5, result: 'failure' as const }
  ]

  return (
    <ul className={classes.upgradesHistoryList}>
      {upgrades.map(({ id, result }) => {
        return (
          <li key={id}>
            <UpgradeItem result={result} />
          </li>
        )
      })}
    </ul>
  )
}
