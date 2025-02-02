import { NextRequest } from 'next/server'
import { ProductRecommender } from '@/lib/recommendations/recommender'
import { getSessionUser } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser(req)
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const recommender = new ProductRecommender()
    const recommendations = await recommender.getRecommendations(user.id)
    
    return Response.json(recommendations)
  } catch (error) {
    console.error('Recommendations error:', error)
    return Response.json(
      { error: 'Failed to fetch recommendations' }, 
      { status: 500 }
    )
  }
} 