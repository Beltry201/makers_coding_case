import { useState } from 'react'
import styled from 'styled-components'
import { X } from 'lucide-react'
import { SignupForm } from './SignupForm'
import { PreferencesForm } from './PreferencesForm'
import { CloseButton, Title } from './LoginModal'

// Reuse styled components from LoginModal
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const Modal = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.large};
  width: 100%;
  max-width: 500px;
  position: relative;
`

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.medium};
  gap: ${props => props.theme.spacing.medium};
`

const Step = styled.div<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.gray.light};
`

interface SignupModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function SignupModal({ onClose, onSuccess }: SignupModalProps) {
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState<any>(null)

  const handleSignupComplete = (data: any) => {
    setUserData(data)
    setStep(2)
  }

  const handlePreferencesComplete = async (preferences: any) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: userData,
          preferences
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      localStorage.setItem('sessionToken', data.session.token)
      onSuccess()
    } catch (error) {
      console.error('Signup error:', error)
      // Handle error appropriately
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        
        <Title>{step === 1 ? 'Create Account' : 'Set Your Preferences'}</Title>
        
        <StepIndicator>
          <Step $active={step === 1} />
          <Step $active={step === 2} />
        </StepIndicator>

        {step === 1 ? (
          <SignupForm onComplete={handleSignupComplete} />
        ) : (
          <PreferencesForm 
            onComplete={handlePreferencesComplete}
            onSkip={() => handlePreferencesComplete(null)}
          />
        )}
      </Modal>
    </Overlay>
  )
} 