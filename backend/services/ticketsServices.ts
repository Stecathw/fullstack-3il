import { CreateTicket, Ticket, UpdateTicket } from '../types/ticket';
import { prismaRepository } from '../repository/prismaRepository';

export const getAll = async (): Promise<Ticket[]> => {
  return await prismaRepository.getAllTickets();
};

export const getOneById = async (id: number): Promise<Ticket | null> => {
  return await prismaRepository.getTicketById(id);
};

export const createOne = async (ticket: CreateTicket): Promise<Ticket> => {
  let { title, description } = ticket;
  if (!description) {
    description = '';
  }
  return await prismaRepository.createTicket({
    title,
    description,
  });
};

export const updateOne = async (id: number, ticket: UpdateTicket): Promise<Ticket | null> => {
  let { title, description, status } = ticket;
  if (!description) {
    description = '';
  }
  return await prismaRepository.updateTicket(
    id,
    {
      title,
      description,
      status
    }
  )
};

export const deleteOne = async (id: number): Promise<Ticket | null> => {
  return await prismaRepository.deleteTicket(id);
};


