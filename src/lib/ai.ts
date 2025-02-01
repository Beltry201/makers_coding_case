import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const SYSTEM_PROMPT = `You are a helpful AI assistant for Makers Tech Store. 
Your role is to help customers find and learn about our tech products.
Be concise, friendly, and always provide accurate information based on the context provided.
If you don't have information about a specific product, say so politely.

Format prices as: $X,XXX.XX
When discussing stock: "X units available"
`

export async function generateAIResponse(
  userMessage: string,
  context: any
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "system",
          content: `Current inventory context: ${JSON.stringify(context)}`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    })

    return response.choices[0].message.content || "I couldn't process that request."
  } catch (error) {
    console.error('OpenAI API error:', error)
    return "I'm having trouble connecting to my knowledge base. Please try again in a moment."
  }
} 