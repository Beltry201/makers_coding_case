'use client'

import styled from 'styled-components'
import { ChatInterface } from '@/components/Chat/ChatInterface'

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
`

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.large};
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.small};
`

const Subtitle = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 1.1rem;
`

export default function Home() {
  return (
    <MainContainer>
      <Header>
        <Title>Makers Tech Store</Title>
        <Subtitle>Your AI-powered shopping assistant</Subtitle>
      </Header>
      <ChatInterface />
    </MainContainer>
  )
}
