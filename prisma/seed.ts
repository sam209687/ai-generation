import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clean the database
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: await bcrypt.hash('password123', 10),
      role: 'ADMIN',
    },
  })

  // Create regular user
  const regularUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Regular User',
      password: await bcrypt.hash('password123', 10),
      role: 'USER',
    },
  })

  // Create categories
  const tshirtCategory = await prisma.category.create({
    data: {
      name: 'T-shirt',
    },
  })

  const jeansCategory = await prisma.category.create({
    data: {
      name: 'Jeans',
    },
  })

  const shoesCategory = await prisma.category.create({
    data: {
      name: 'Shoes',
    },
  })

  // Create products
  // T-shirts
  await prisma.product.create({
    data: {
      name: 'Classic White T-shirt',
      description: 'A comfortable classic white t-shirt made from 100% cotton',
      price: 29.99,
      image: '/images/white-tshirt.jpg',
      stock: 50,
      categoryId: tshirtCategory.id,
    },
  })

  await prisma.product.create({
    data: {
      name: 'Black Graphic T-shirt',
      description: 'Stylish black t-shirt with modern graphic design',
      price: 34.99,
      image: '/images/black-tshirt.jpg',
      stock: 40,
      categoryId: tshirtCategory.id,
    },
  })

  // Jeans
  await prisma.product.create({
    data: {
      name: 'Classic Blue Jeans',
      description: 'Traditional blue denim jeans with perfect fit',
      price: 59.99,
      image: '/images/blue-jeans.jpg',
      stock: 30,
      categoryId: jeansCategory.id,
    },
  })

  await prisma.product.create({
    data: {
      name: 'Black Slim Jeans',
      description: 'Modern slim-fit black jeans',
      price: 64.99,
      image: '/images/black-jeans.jpg',
      stock: 25,
      categoryId: jeansCategory.id,
    },
  })

  // Shoes
  await prisma.product.create({
    data: {
      name: 'Classic Sneakers',
      description: 'Comfortable everyday sneakers',
      price: 79.99,
      image: '/images/sneakers.jpg',
      stock: 20,
      categoryId: shoesCategory.id,
    },
  })

  await prisma.product.create({
    data: {
      name: 'Running Shoes',
      description: 'High-performance running shoes',
      price: 89.99,
      image: '/images/running-shoes.jpg',
      stock: 15,
      categoryId: shoesCategory.id,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })