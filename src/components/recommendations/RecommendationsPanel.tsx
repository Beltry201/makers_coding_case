import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ProductCard } from './ProductCard'
import { ProductRecommendations } from '@/types/product'
import { useSession } from '@/hooks/useSession'

const Panel = styled.div`
  width: 300px;
  padding: ${props => props.theme.spacing.medium};
  background: ${props => props.theme.colors.background};
  border-left: 1px solid ${props => props.theme.colors.border};
`

const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing.large};
`

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.medium};
  color: ${props => props.theme.colors.text};
`

export function RecommendationsPanel() {
  const [recommendations, setRecommendations] = useState<ProductRecommendations | null>(null)
  const [loading, setLoading] = useState(true)
  const { session } = useSession()

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await fetch('/api/recommendations', {
          headers: {
            Authorization: `Bearer ${session?.token}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations')
        }
        
        const data = await response.json()
        setRecommendations(data)
      } catch (error) {
        console.error('Failed to fetch recommendations:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session?.token) {
      fetchRecommendations()
    }
  }, [session?.token])

  if (loading) return <Panel>Loading recommendations...</Panel>
  if (!recommendations) return null

  return (
    <Panel>
      <Section>
        <SectionTitle>Highly Recommended</SectionTitle>
        {recommendations.highlyRecommended.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Section>

      <Section>
        <SectionTitle>Recommended</SectionTitle>
        {recommendations.recommended.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Section>
    </Panel>
  )
} 