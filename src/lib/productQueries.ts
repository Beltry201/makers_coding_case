import { prisma } from './prisma'

export async function queryProducts(keywords: string[]) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: keywords.join(' '), mode: 'insensitive' } },
        { brand: { in: keywords, mode: 'insensitive' } },
        { 
          category: {
            name: { in: keywords, mode: 'insensitive' }
          }
        }
      ]
    },
    include: {
      category: true
    }
  })
  
  return products
} 