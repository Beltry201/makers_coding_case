import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

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

  /* Markdown styles */
  img {
    max-width: 100%;
    height: auto;
    border-radius: ${props => props.theme.borderRadius};
    margin: ${props => props.theme.spacing.small} 0;
  }

  p {
    margin: ${props => props.theme.spacing.small} 0;
    &:first-child { margin-top: 0; }
    &:last-child { margin-bottom: 0; }
  }

  ul, ol {
    margin: ${props => props.theme.spacing.small} 0;
    padding-left: ${props => props.theme.spacing.large};
  }

  strong {
    font-weight: 600;
  }
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
        <ReactMarkdown>
          {message.content}
        </ReactMarkdown>
      </MessageBubble>
    </MessageContainer>
  )
} 