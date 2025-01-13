import { ContractHistoryItem } from '../ContractHistoryItem/ContractHistoryItem'

import classes from './ContractsHistoryList.module.scss'

export const ContractsHistoryList = () => {
  return (
    <div className={classes.contractsHistoryList}>
      <ContractHistoryItem />
      <ContractHistoryItem />
      <ContractHistoryItem />
      <ContractHistoryItem />
    </div>
  )
}
