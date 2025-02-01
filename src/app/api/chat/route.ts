import { NextResponse } from 'next/server'
import { analyzeMessage } from '@/lib/messageAnalyzer'
import { queryProducts } from '@/lib/productQueries'
import { generateAIResponse } from '@/lib/ai'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      )
    }

    // Analyze message
    const { intent, keywords } = analyzeMessage(message)
    console.log('Intent:', intent)
    console.log('Keywords:', keywords)
    
    // Get relevant products
    const products = await queryProducts(keywords)
    
    // Add intent-specific context
    const context = {
      intent,
      products,
      totalFound: products.length,
      query: keywords.join(' ')
    }
    
    // Generate AI response
    const response = await generateAIResponse(message, context)
    
    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
} 