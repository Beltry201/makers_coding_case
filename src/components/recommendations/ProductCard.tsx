import styled from 'styled-components'
import { Product } from '@/types/product'

const Card = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.small};
`

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius};
`

const ProductName = styled.h3`
  margin: ${props => props.theme.spacing.small} 0;
`

const ProductPrice = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <ProductImage src={product.imageUrl || '/placeholder.png'} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>${product.price.toString()}</ProductPrice>
    </Card>
  )
} 