import Image from 'next/image'
import cn from 'classnames'

import classes from './CasePreviewOpen.module.scss'

type CasePreviewOpenProps = {
  caseName: string
  previewImage: string
  previewsNumber: number
  hasBoxBg: boolean
  imageType: 'FirstCategory' | 'SecondCategory'
}

export const CasePreviewOpen = ({
  caseName,
  previewImage,
  previewsNumber,
  hasBoxBg,
  imageType
}: CasePreviewOpenProps) => {
  return (
    <div className={classes.casePreviewOpen}>
      {Array.from({ length: previewsNumber })
        .fill(null)
        .map((_, idx) => (
          <div
            key={idx}
            className={cn(classes.caseImage, {
              [classes.withBoxBg]: hasBoxBg,
              [classes.single]: previewsNumber === 1,
              [classes.three]: previewsNumber === 3,
              [classes.four]: previewsNumber === 4,
              [classes.five]: previewsNumber === 5,
              [classes.firstFormatImage]: imageType === 'FirstCategory',
              [classes.secondFormatImage]: imageType === 'SecondCategory'
            })}
          >
            <Image src={previewImage} fill alt={caseName} />
          </div>
        ))}
    </div>
  )
}
