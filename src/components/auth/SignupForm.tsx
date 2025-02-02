import { useState } from 'react'
import styled from 'styled-components'
import { z } from 'zod'

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

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional(),
})

interface SignupFormProps {
  onComplete: (data: z.infer<typeof signupSchema>) => void
}

export function SignupForm({ onComplete }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    try {
      // Validate form data
      const validatedData = signupSchema.parse(formData)

      // Check if email is already registered
      const emailCheck = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      })

      const { exists } = await emailCheck.json()

      if (exists) {
        setErrors({ email: 'Email already registered' })
        return
      }

      onComplete(validatedData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message
          }
        })
        setErrors(newErrors)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          $hasError={!!errors.email}
          required
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="name">Name (Optional)</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          $hasError={!!errors.name}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
          $hasError={!!errors.password}
          required
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </InputGroup>

      <SubmitButton type="submit" $isLoading={isLoading}>
        {isLoading ? 'Creating Account...' : 'Continue'}
      </SubmitButton>
    </Form>
  )
} 