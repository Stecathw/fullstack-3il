import { PrismaClient } from "@prisma/client";
import { Contact } from "../types/contact";

const prisma = new PrismaClient();

export const prismaRepository = {
  async getAllContacts(): Promise<Contact[]> {
    return await prisma.contact.findMany({
      include: { Genre: true },
    });
  },

  async getContactById(id: number): Promise<Contact | null> {
    return await prisma.contact.findUnique({
      where: { id },
      include: { Genre: true },
    });
  },

  async createContact(data: {
    firstname: string;
    lastname: string;
    genreId: number;
  }): Promise<Contact> {
    return await prisma.contact.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        genreId: data.genreId,
      },
      include: { Genre: true },
    });
  },

  async updateContact(
    id: number,
    data: { firstname: string; lastname: string; genreId: number }
  ): Promise<Contact | null> {
    return await prisma.contact.update({
      where: { id },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        genreId: data.genreId,
      },
      include: { Genre: true },
    });
  },

  async deleteContact(id: number): Promise<Contact | null> {
    return await prisma.contact.delete({
      where: { id },
    });
  },

  async clearDatabase(): Promise<void> {
    await prisma.contact.deleteMany();
    await prisma.genre.deleteMany();
  },

  async closeDatabase(): Promise<void> {
    await prisma.$disconnect();
  },
  
}

