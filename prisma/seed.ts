import { PrismaClient } from '@prisma/client'
import { categories } from './seedData/categories'
import { products } from './seedData/products'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.chatMessage.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.metricLog.deleteMany({})

  console.log('Deleted existing data')

  // Create categories
  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.category.create({
        data: category,
      })
    )
  )

  console.log('Created categories:', createdCategories.length)

  // Create products with category relationships
  const createdProducts = await Promise.all(
    products.map(async (product) => {
      const category = createdCategories.find((c) => c.name === product.categoryName)
      if (!category) throw new Error(`Category not found: ${product.categoryName}`)
      
      const { categoryName, ...productData } = product
      return prisma.product.create({
        data: {
          ...productData,
          categoryId: category.id,
        },
      })
    })
  )

  console.log('Created products:', createdProducts.length)

  // Create a demo user
  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@makerstech.store',
      name: 'Demo User',
      preferences: {
        preferredBrands: ['Apple', 'Dell', 'HP'],
        preferredCategories: ['Laptops', 'Smartphones'],
        priceRange: { min: 500, max: 2000 }
      }
    }
  })

  console.log('Created demo user')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 