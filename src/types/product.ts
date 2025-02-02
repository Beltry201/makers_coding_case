import { Product as PrismaProduct } from '@prisma/client'

export type Product = PrismaProduct

export interface UserPreferences {
  preferredCategories: string[]
  priceRange: {
    min: number
    max: number
  }
  preferredBrands: string[]
  specialFeatures: string[]
}

export interface RecommendationScores {
  categoryMatch: number
  priceMatch: number
  brandMatch: number
  featuresMatch: number
  dynamicScore: number
}

export interface ScoredProduct {
  product: Product
  score: number
}

export interface ProductRecommendations {
  highlyRecommended: Product[]
  recommended: Product[]
  notRecommended: Product[]
} 