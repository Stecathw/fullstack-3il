import { PrismaClient, TicketStatus } from '@prisma/client';
const prisma = new PrismaClient()

async function main() {

  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: [
      {
        id: 1,
        title: 'Example Ticket',
        description: 'This is an example ticket',
        status: TicketStatus.A_FAIRE,
      },
      {
        id: 2,
        title: 'Example Ticket 2',
        description: 'En cours',
        status: TicketStatus.EN_COURS,
      },
      {
        id: 3,
        title: 'Example Ticket 3',
        description: '',
        status: TicketStatus.A_FAIRE,
      },
      {
        id: 4,
        title: 'Example Ticket 4',
        description: 'Hello world',
        status: TicketStatus.TERMINE,
      },
      {
        id: 5,
        title: 'Example Ticket 5',
        description: 'Finished !',
        status: TicketStatus.TERMINE,
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



