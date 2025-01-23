'use client'

import { CaseReopenActions } from '@/features/cases'
import { CaseDroppedItem, useCaseItem } from '@/entities/loot'

import classes from './CaseAfterOpen.module.scss'

type CaseAfterOpenProps = {
  caseId: string
  droppedItemId: string
  onCaseReopen: () => void
}

export const CaseAfterOpen = ({ caseId, droppedItemId, onCaseReopen }: CaseAfterOpenProps) => {
  const { data: droppedLootItem, isLoading: isDroppedLootItemLoading } = useCaseItem({
    itemId: droppedItemId
  })

  if (!droppedLootItem || isDroppedLootItemLoading) return 'Loot loading...'

  return (
    <div className={classes.caseAfterOpen}>
      <div className={classes.droppedItem}>
        <CaseDroppedItem
          droppedItem={{
            game: droppedLootItem.game,
            image: droppedLootItem.image,
            name: droppedLootItem.name,
            rarity: droppedLootItem.rarity
          }}
          onItemSell={() => {}}
        />
      </div>

      <CaseReopenActions
        itemSellPrice={droppedLootItem.sellPrice}
        onCaseReopen={onCaseReopen}
        onItemSell={() => {}}
        onItemUpgrade={() => {}}
      />
    </div>
  )
}
