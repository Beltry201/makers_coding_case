import { useState } from 'react'
import styled from 'styled-components'
import { X } from 'lucide-react'

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
  max-width: 400px;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.medium};
  right: ${props => props.theme.spacing.medium};
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.gray.dark};
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`

const Title = styled.h2`
  margin-bottom: ${props => props.theme.spacing.large};
  color: ${props => props.theme.colors.text};
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.small};
`

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`

const Input = styled.input<{ $hasError?: boolean }>`
  padding: ${props => props.theme.spacing.medium};
  border: 1px solid ${props => 
    props.$hasError 
      ? props.theme.colors.error 
      : props.theme.colors.gray.medium};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.8rem;
`

const SubmitButton = styled.button<{ $isLoading?: boolean }>`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.medium};
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`

interface LoginModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setGeneralError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          setGeneralError('Invalid email or password')
        } else if (data.error) {
          setGeneralError(data.error)
        } else {
          setGeneralError('An error occurred during login')
        }
        return
      }

      localStorage.setItem('sessionToken', data.session.token)
      onSuccess()
    } catch (error) {
      setGeneralError('Failed to connect to the server')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        
        <Title>Welcome Back</Title>

        {generalError && (
          <ErrorMessage>{generalError}</ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              $hasError={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
              $hasError={!!errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <SubmitButton type="submit" $isLoading={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </SubmitButton>
        </Form>
      </Modal>
    </Overlay>
  )
} 