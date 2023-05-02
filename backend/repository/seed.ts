import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

  await prisma.contact.deleteMany();
  await prisma.genre.deleteMany();
  
  // Create genres
  const male = await prisma.genre.create({
    data: {
      id: 1,
      libelle: 'Male',
    },
  });
  const female = await prisma.genre.create({
    data: {
      id: 2,
      libelle: 'Female',
    },
  });
  const others = await prisma.genre.create({
    data: {
      id: 3,
      libelle: 'Others',
    },
  });  
  // Create users
  await prisma.contact.createMany({
    data: [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Repool',
        genreId: male.id,
      },
      {
        id: 2,
        firstname: 'Jane',
        lastname: 'Doe',
        genreId: female.id,
      },
      {
        id: 3,
        firstname: 'Mooul',
        lastname: 'Pool',
        genreId: others.id,
      },
    ],
  });
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



