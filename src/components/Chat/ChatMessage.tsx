import styled from 'styled-components'

const MessageContainer = styled.div<{ $isAssistant: boolean }>`
  display: flex;
  justify-content: ${props => props.$isAssistant ? 'flex-start' : 'flex-end'};
  margin: ${props => props.theme.spacing.small} 0;
`

const MessageBubble = styled.div<{ $isAssistant: boolean }>`
  max-width: 80%;
  padding: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => 
    props.$isAssistant 
      ? props.theme.colors.gray.light 
      : props.theme.colors.primary};
  color: ${props => 
    props.$isAssistant 
      ? props.theme.colors.text 
      : props.theme.colors.white};
`

interface ChatMessageProps {
  message: {
    content: string
    role: 'user' | 'assistant'
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant'
  
  return (
    <MessageContainer $isAssistant={isAssistant}>
      <MessageBubble $isAssistant={isAssistant}>
        {message.content}
      </MessageBubble>
    </MessageContainer>
  )
} 