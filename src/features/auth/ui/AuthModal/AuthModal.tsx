'use client'

import { useState } from 'react'

import { AuthModalBase } from '@/entities/auth'
import { EmailForm } from '../EmailForm/EmailForm'
import { CodeVerificationForm } from '../CodeVerificationForm/CodeVerificationForm'
import { EnterPasswordForm } from '../EnterPasswordForm/EnterPasswordForm'
import { SocialNetworksAuth } from '../SocialNetworksAuth/SocialNetworksAuth'
import { CreatePasswordForm } from '../CreatePasswordForm/CreatePasswordForm'
import { PasswordResetForm } from '../PasswordResetForm/PasswordResetForm'
import { PasswordResetSuccess } from '../PasswordResetSuccess/PasswordResetSuccess'

import { useSignUp } from '../../model/useSignUp'
import { useSignIn } from '../../model/useSignIn'

type Step = 'email' | 'code' | 'password' | 'password-reset' | 'password-reset-success'
type EmailData = { email: string; isEmailExist?: boolean }

type AuthModalProps = {
  open: boolean
  onClose: () => void
}

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState('')
  const [isEmailExist, setEmailExist] = useState<boolean>(false)
  const [step, setStep] = useState<Step>('email')

  const signUp = useSignUp()
  const signIn = useSignIn()

  const signInError =
    signIn.error && signIn.error.response?.data.error === 'Invalid Password'
      ? 'Неправильный пароль'
      : undefined

  const setEmailData = ({ email, isEmailExist }: EmailData) => {
    setEmail(email)
    setEmailExist(Boolean(isEmailExist))

    if (isEmailExist) {
      setStep('password')
    } else {
      setStep('code')
    }
  }

  const toPasswordStep = (code: string) => {
    console.log(code)
    setStep('password')
  }

  const toPrevStep = () => {
    switch (step) {
      case 'email':
        return

      case 'code':
        setStep('email')
        return

      case 'password':
        setStep('email')
        return

      case 'password-reset':
        setStep('password')
        return

      case 'password-reset-success':
        setStep('password')
        return
    }
  }

  const signInUser = (password: string) => {
    signIn.mutate({ email, password })
  }

  const signUpUser = (password: string) => {
    signUp.mutate({ email, password })
  }

  const resetPassword = (email: string) => {
    setEmail(email)
    setStep('password-reset-success')
  }

  return (
    <AuthModalBase
      open={open}
      SocialAuthSlot={<SocialNetworksAuth />}
      stepBackAvailable={step !== 'email'}
      onStepBack={toPrevStep}
      onClose={onClose}
    >
      {step === 'email' ? <EmailForm onEmailSubmit={setEmailData} /> : null}

      {step === 'code' ? <CodeVerificationForm onCodeSubmit={toPasswordStep} /> : null}

      {step === 'password' && isEmailExist ? (
        <EnterPasswordForm
          error={signInError}
          loading={signIn.isPending}
          onPasswordSubmit={signInUser}
          onPasswordReset={() => {
            setStep('password-reset')
          }}
        />
      ) : null}

      {step === 'password' && !isEmailExist ? (
        <CreatePasswordForm loading={signUp.isPending} onPasswordSubmit={signUpUser} />
      ) : null}

      {step === 'password-reset' ? (
        <PasswordResetForm loading={false} onPasswordReset={resetPassword} />
      ) : null}

      {step === 'password-reset-success' ? (
        <PasswordResetSuccess
          onStepBack={() => {
            setStep('password')
          }}
        />
      ) : null}
    </AuthModalBase>
  )
}
