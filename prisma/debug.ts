const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Print the full schema
  console.log('Database schema:')
  const result = await prisma.$queryRaw`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'User';
  `
  console.log(result)

  // Try to create a test user
  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      password: 'test',
      role: 'USER',
    }
  })
  console.log('Created user:', user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()) 