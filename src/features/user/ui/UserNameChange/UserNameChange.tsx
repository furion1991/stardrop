'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { TextField } from '@/shared/ui'

import classes from './UserNameChange.module.scss'

const schema = z.object({
  newUserName: z.string().min(1, { message: 'Поле обязательно' })
})
type FormSchema = z.infer<typeof schema>

type UserNameChangeProps = {
  userName: string
  onUserNameSubmit: () => void
}

export const UserNameChange = ({ userName, onUserNameSubmit }: UserNameChangeProps) => {
  const useFormProps = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      newUserName: userName
    }
  })
  const {
    handleSubmit,
    formState: { errors }
  } = useFormProps

  const onFormSubmit = ({ newUserName }: FormSchema) => {
    console.log(newUserName)
    onUserNameSubmit()
  }

  return (
    <FormProvider {...useFormProps}>
      <form className={classes.userNameChange} onSubmit={handleSubmit(onFormSubmit)}>
        <TextField
          className={classes.textField}
          name='newUserName'
          placeholder='Введите новый никнейм'
          defaultValue=''
        />

        <button className={classes.changeBtn} type='submit'>
          Сохранить
        </button>
      </form>
    </FormProvider>
  )
}
