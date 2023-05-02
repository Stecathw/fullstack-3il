import {Contact, CreateContactInput} from '../types/contact';
import { prismaRepository } from '../repository/prismaRepository';

export const getAll = async (): Promise<Contact[]> => {
  return await prismaRepository.getAllContacts();
};

export const getOneById = async (id: number): Promise<Contact | null> => {
  return await prismaRepository.getContactById(id);
};

export const createOne = async (contact: CreateContactInput): Promise<Contact> => {
  return await prismaRepository.createContact({
    ...contact
  });
};

export const updateOne = async (id: number, contact: CreateContactInput): Promise<Contact | null> => {
  return await prismaRepository.updateContact(
    id,
    {...contact}
  )
};

export const deleteOne = async (id: number): Promise<Contact | null> => {
  return await prismaRepository.deleteContact(id);
};


