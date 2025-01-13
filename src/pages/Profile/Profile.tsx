import { UserHistory, UserInfoPanel } from '@/widgets/user'

import classes from './Profile.module.scss'

export const ProfilePage = () => {
  return (
    <div className={classes.wrapper}>
      <UserInfoPanel />

      <div className={classes.userHistory}>
        <UserHistory />
      </div>
    </div>
  )
}
