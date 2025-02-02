import { useState } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.large};
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
`

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  margin: 0;
`

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${props => props.theme.spacing.small};
`

const Option = styled.button<{ $selected: boolean }>`
  padding: ${props => props.theme.spacing.medium};
  border: 1px solid ${props => 
    props.$selected 
      ? props.theme.colors.primary 
      : props.theme.colors.gray.medium};
  background: ${props => 
    props.$selected 
      ? props.theme.colors.primary + '10' 
      : props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.small};
`

const RangeInputs = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
`

const RangeInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.medium};
  border: 1px solid ${props => props.theme.colors.gray.medium};
  border-radius: ${props => props.theme.borderRadius};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
  margin-top: ${props => props.theme.spacing.medium};
`

const Button = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: ${props => props.theme.spacing.medium};
  background: ${props => props.$primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$primary ? props.theme.colors.white : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`

const categories = ['Laptops', 'Smartphones', 'Tablets', 'Accessories']
const brands = ['Apple', 'Dell', 'Samsung', 'HP', 'Lenovo']
const features = ['Performance', 'Battery Life', 'Portability', 'Value for Money']

interface PreferencesFormProps {
  onComplete: (preferences: any) => void
  onSkip: () => void
}

export function PreferencesForm({ onComplete, onSkip }: PreferencesFormProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete({
      preferredCategories: selectedCategories,
      priceRange,
      preferredBrands: selectedBrands,
      specialFeatures: selectedFeatures,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Section>
        <SectionTitle>Preferred Categories</SectionTitle>
        <OptionsGrid>
          {categories.map(category => (
            <Option
              key={category}
              type="button"
              $selected={selectedCategories.includes(category)}
              onClick={() => {
                setSelectedCategories(prev =>
                  prev.includes(category)
                    ? prev.filter(c => c !== category)
                    : [...prev, category]
                )
              }}
            >
              {category}
            </Option>
          ))}
        </OptionsGrid>
      </Section>

      <Section>
        <SectionTitle>Price Range</SectionTitle>
        <RangeContainer>
          <RangeInputs>
            <RangeInput
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={e => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
              min={0}
            />
            <RangeInput
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={e => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
              min={priceRange.min}
            />
          </RangeInputs>
        </RangeContainer>
      </Section>

      <Section>
        <SectionTitle>Preferred Brands</SectionTitle>
        <OptionsGrid>
          {brands.map(brand => (
            <Option
              key={brand}
              type="button"
              $selected={selectedBrands.includes(brand)}
              onClick={() => {
                setSelectedBrands(prev =>
                  prev.includes(brand)
                    ? prev.filter(b => b !== brand)
                    : [...prev, brand]
                )
              }}
            >
              {brand}
            </Option>
          ))}
        </OptionsGrid>
      </Section>

      <Section>
        <SectionTitle>Important Features</SectionTitle>
        <OptionsGrid>
          {features.map(feature => (
            <Option
              key={feature}
              type="button"
              $selected={selectedFeatures.includes(feature)}
              onClick={() => {
                setSelectedFeatures(prev =>
                  prev.includes(feature)
                    ? prev.filter(f => f !== feature)
                    : [...prev, feature]
                )
              }}
            >
              {feature}
            </Option>
          ))}
        </OptionsGrid>
      </Section>

      <ButtonGroup>
        <Button type="button" onClick={onSkip}>
          Skip for Now
        </Button>
        <Button type="submit" $primary>
          Complete Setup
        </Button>
      </ButtonGroup>
    </Form>
  )
} 