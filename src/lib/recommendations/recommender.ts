import { prisma } from '@/lib/prisma'
import { ProductScorer } from './scoring'
import { ProductRecommendations } from '@/types/product'

export class ProductRecommender {
  private async getUserWithPreferences(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        preferences: true,
        productInteractions: {
          include: {
            product: true
          }
        }
      }
    })
  }

  private async getAllProducts() {
    return await prisma.product.findMany({
      include: {
        category: true,
        interactions: {
          select: {
            type: true,
            timestamp: true
          }
        }
      }
    })
  }

  async getRecommendations(userId: string): Promise<ProductRecommendations> {
    const user = await this.getUserWithPreferences(userId)
    if (!user || !user.preferences) {
      throw new Error('User not found or has no preferences')
    }

    const products = await this.getAllProducts()
    const scorer = new ProductScorer()
    
    const scoredProducts = products.map(product => ({
      product,
      score: scorer.calculateScore(product, user.preferences as any)
    }))

    // Sort by score in descending order
    scoredProducts.sort((a, b) => b.score - a.score)

    return {
      highlyRecommended: scoredProducts
        .filter(p => p.score >= 80)
        .map(p => p.product),
      recommended: scoredProducts
        .filter(p => p.score >= 60 && p.score < 80)
        .map(p => p.product),
      notRecommended: scoredProducts
        .filter(p => p.score < 60)
        .map(p => p.product)
    }
  }
} 