type Intent = 'product_search' | 'product_info' | 'stock_check' | 'price_query'

function extractKeywords(message: string): string[] {
  const stopWords = ['how', 'many', 'what', 'is', 'the', 'price', 'of', 'tell', 'me', 'about', 'do', 'you', 'have']
  const words = message.toLowerCase().split(' ')
  return words
    .filter(word => !stopWords.includes(word))
    .filter(word => word.length > 2)
}

/**
 * Analyzes the user's message and returns the intent and keywords
 * @param message - The user's message
 * @returns The intent and keywords
 */
export function analyzeMessage(message: string): { intent: Intent; keywords: string[] } {
  const lowercased = message.toLowerCase()
  
  if (lowercased.includes('how many') || lowercased.includes('available')) {
    return {
      intent: 'stock_check',
      keywords: extractKeywords(message)
    }
  }
  
  if (lowercased.includes('price') || lowercased.includes('cost')) {
    return {
      intent: 'price_query',
      keywords: extractKeywords(message)
    }
  }
  
  if (lowercased.includes('tell me about') || lowercased.includes('what is')) {
    return {
      intent: 'product_info',
      keywords: extractKeywords(message)
    }
  }
  
  return {
    intent: 'product_search',
    keywords: extractKeywords(message)
  }
} 