import { PrismaClient } from "@prisma/client";
import { Ticket, TicketStatus } from "../types/ticket";

const prisma = new PrismaClient();

export const prismaRepository = {

  async getAllTickets(): Promise<Ticket[]> {
    return await prisma.ticket.findMany({});
  },

  async getTicketById(id: number): Promise<Ticket | null> {
    return await prisma.ticket.findUnique({
      where: { id },
    });
  },

  async createTicket(data: {
    title: string;
    description: string;
  }): Promise<Ticket> {
    return await prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });
  },

  async updateTicket(
    id: number,
    data: { title: string; description: string; status: TicketStatus }
  ): Promise<Ticket | null> {
    return await prisma.ticket.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
      },
    });
  },

  async deleteTicket(id: number): Promise<Ticket | null> {
    return await prisma.ticket.delete({
      where: { id },
    });
  },

  async clearDatabase(): Promise<void> {
    await prisma.ticket.deleteMany();
  },

  async closeDatabase(): Promise<void> {
    await prisma.$disconnect();
  },
  
}

