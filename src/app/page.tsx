'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { ChatInterface } from '@/components/Chat/ChatInterface'
import { LoginModal } from '@/components/auth/LoginModal'
import { SignupModal } from '@/components/auth/SignupModal'
import { useSession } from '@/hooks/useSession'
import { RecommendationsPanel } from '@/components/recommendations/RecommendationsPanel'

const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
`

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.large};
  position: relative;
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

const AuthButtons = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: ${props => props.theme.spacing.medium};
`

const AuthButton = styled.button`
  padding: ${props => props.theme.spacing.medium};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`

const ContentContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.large};
`

const ChatContainer = styled.div`
  flex: 1;
`

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const { user, isLoading } = useSession()

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
    // Optionally refresh the page or update state
    window.location.reload()
  }

  return (
    <MainContainer>
      <Header>
        <Title>Makers Tech Store</Title>
        <Subtitle>Your AI-powered shopping assistant</Subtitle>
        {!isLoading && !user && (
          <AuthButtons>
            <AuthButton onClick={() => setShowSignupModal(true)}>
              Sign Up
            </AuthButton>
            <AuthButton onClick={() => setShowLoginModal(true)}>
              Log In
            </AuthButton>
          </AuthButtons>
        )}
      </Header>
      <ContentContainer>
        <ChatContainer>
          <ChatInterface />
        </ChatContainer>
        {user && <RecommendationsPanel />}
      </ContentContainer>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </MainContainer>
  )
}
