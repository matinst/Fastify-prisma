import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// INSERT INTO `category` VALUES (3, 1, '77', 250, 1);
// INSERT INTO `category` VALUES (3, 1, '76', 160, 2);
// INSERT INTO `category` VALUES (3, 1, '75', 200, 3);
async function main() {
    const record1 = await prisma.category.create({ data: { latitude: 3, longitude: 1, category: '77', counter: 250 }})
    const record2 = await prisma.category.create({ data: { latitude: 3, longitude: 1, category: '76', counter: 160 }})
    const record3 = await prisma.category.create({ data: { latitude: 3, longitude: 1, category: '75', counter: 200 }})

    console.log({ record1, record2, record3})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })