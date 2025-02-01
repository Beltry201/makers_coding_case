'use client'

import { useState } from 'react'
import styled from 'styled-components'

const InputForm = styled.form`
  border-top: 1px solid ${props => props.theme.colors.gray.medium};
  padding: ${props => props.theme.spacing.medium};
`

const InputContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
`

const Input = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.gray.medium};
  border-radius: ${props => props.theme.borderRadius};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.gray.light};
  }
`

const SendButton = styled.button<{ disabled: boolean }>`
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <InputForm onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about our products..."
          disabled={isLoading}
        />
        <SendButton 
          type="submit" 
          disabled={isLoading || !message.trim()}
        >
          Send
        </SendButton>
      </InputContainer>
    </InputForm>
  )
} 