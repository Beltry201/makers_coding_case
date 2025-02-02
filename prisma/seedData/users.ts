enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

type PriceRange = {
  min: number;
  max: number;
}

export const users = [
  {
    email: 'admin@makerstech.store',
    name: 'Admin User',
    password: 'admin123',
    role: 'ADMIN',
    preferences: {
      preferredCategories: ['Laptops', 'Smartphones', 'Tablets'],
      priceRange: {
        min: 1000,
        max: 5000
      },
      preferredBrands: ['Apple', 'Dell', 'Samsung'],
      specialFeatures: ['Performance', 'Battery Life']
    }
  },
  {
    email: 'demo@makerstech.store',
    name: 'Demo User',
    password: 'demo123',
    preferences: {
      preferredCategories: ['Laptops', 'Smartphones'],
      priceRange: {
        min: 500,
        max: 2000
      },
      preferredBrands: ['Dell', 'Samsung'],
      specialFeatures: ['Value for Money']
    }
  },
  {
    email: 'test@makerstech.store',
    name: 'Test User',
    password: 'test123',
    preferences: {
      preferredCategories: ['Accessories', 'Tablets'],
      priceRange: {
        min: 0,
        max: 1000
      },
      preferredBrands: ['Lenovo', 'HP'],
      specialFeatures: ['Portability']
    }
  }
] 