import Image from 'next/image'

import classes from './IdCopier.module.scss'

type IdCopierProps = {
  id: string
}

export const IdCopier = ({ id }: IdCopierProps) => {
  const copyIdToClipboard = (id: string) => {
    navigator.clipboard.writeText(id)
  }

  return (
    <div className={classes.idCopier}>
      ID: <span>{id}</span>
      <button
        type='button'
        onClick={() => {
          copyIdToClipboard(id)
        }}
      >
        <Image src='/img/copy.png' width={12} height={12} alt='Копировать' />{' '}
      </button>
    </div>
  )
}
