import { Product, UserPreferences, RecommendationScores } from '@/types/product'

export class ProductScorer {
  private weights = {
    categoryMatch: 25,
    priceRange: 25,
    brandPreference: 20,
    featuresMatch: 20,
    dynamicFactors: 10
  }

  private calculateCategoryScore(product: Product, preferences: UserPreferences): number {
    if (!preferences.preferredCategories?.length) return this.weights.categoryMatch / 2
    return preferences.preferredCategories.includes(product.category.name) 
      ? this.weights.categoryMatch 
      : 0
  }

  private calculatePriceScore(product: Product, preferences: UserPreferences): number {
    if (!preferences.priceRange) return this.weights.priceRange / 2
    
    const { min, max } = preferences.priceRange
    const price = Number(product.price)
    
    if (price >= min && price <= max) return this.weights.priceRange
    
    // Calculate partial score based on how far outside the range
    const midPoint = (min + max) / 2
    const maxDistance = Math.max(midPoint - min, max - midPoint)
    const distance = Math.abs(price - midPoint)
    
    return Math.max(0, this.weights.priceRange * (1 - distance / maxDistance))
  }

  private calculateBrandScore(product: Product, preferences: UserPreferences): number {
    if (!preferences.preferredBrands?.length) return this.weights.brandPreference / 2
    return preferences.preferredBrands.includes(product.brand)
      ? this.weights.brandPreference
      : 0
  }

  private calculateFeaturesScore(product: Product, preferences: UserPreferences): number {
    if (!preferences.specialFeatures?.length) return this.weights.featuresMatch / 2
    
    const productFeatures = Object.keys(product.features)
    const matchingFeatures = preferences.specialFeatures
      .filter(feature => productFeatures.includes(feature))
    
    return (matchingFeatures.length / preferences.specialFeatures.length) 
      * this.weights.featuresMatch
  }

  private calculateDynamicScore(product: Product): number {
    // Consider popularity and stock
    const popularityScore = Math.min(product.popularity * 5, 5)
    const stockScore = product.stock > 0 ? 5 : 0
    
    return popularityScore + stockScore
  }

  private computeFinalScore(scores: RecommendationScores): number {
    return Object.values(scores).reduce((sum, score) => sum + score, 0)
  }

  calculateScore(product: Product, preferences: UserPreferences): number {
    const scores = {
      categoryMatch: this.calculateCategoryScore(product, preferences),
      priceMatch: this.calculatePriceScore(product, preferences),
      brandMatch: this.calculateBrandScore(product, preferences),
      featuresMatch: this.calculateFeaturesScore(product, preferences),
      dynamicScore: this.calculateDynamicScore(product)
    }

    return this.computeFinalScore(scores)
  }
} 