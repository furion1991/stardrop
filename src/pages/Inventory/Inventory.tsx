import { UserInfoPanel } from '@/entities/user'

import classes from './Inventory.module.scss'

export const InventoryPage = () => {
  return (
    <div className={classes.wrapper}>
      <UserInfoPanel />
    </div>
  )
}
