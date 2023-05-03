import {describe, expect, test, afterAll} from '@jest/globals';
import request from 'supertest';
import {server} from './index';
import { prismaRepository } from './repository/prismaRepository';
import { TicketStatus } from '@prisma/client';

describe('Test the root path', () => {

  test('It should respond 200 to the GET method', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('It should return the welcome message', async () => {
    const response = await request(server).get('/');
    expect(response.text).toBe(
      'Welcome on my  RestAPi, all routes are found under <base_url>/api/tickets/'
    );
  });

  test('should return a list of tickets', async () => {
    const res = await request(server).get('/api/tickets/all');
    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('should return a single contact', async () => {
    const res = await request(server).get('/api/tickets/1');
    expect(res.status).toEqual(200);
    expect(res.body.title).toBeDefined();
    expect(res.body.description).toBeDefined();
    expect(res.body.status).toBeDefined();
  });

  test('should return a 404 status code if the ticket does not exist', async () => {
    const res = await request(server).get('/api/tickets/9999');
    expect(res.status).toEqual(404);
    expect(res.text).toEqual('Ticket not found');
  });

  test('should create a new ticket', async () => {
    const newTicket = {
      title: 'TEST',
      description: 'Test creation',
    };
    const res = await request(server).post('/api/tickets').send(newTicket);
    expect(res.status).toEqual(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toEqual(newTicket.title);
    expect(res.body.description).toEqual(newTicket.description);
  });

  test('should update a ticket', async () => {
    const updatedTicket = {
      id: 1,
      title: 'FERMETURE',
      description: 'Ticket fermé',
      status: TicketStatus.TERMINE
    };
    const res = await request(server).put('/api/tickets/1').send(updatedTicket);
    expect(res.status).toEqual(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toEqual(updatedTicket.title);
    expect(res.body.description).toEqual(updatedTicket.description);
    expect(res.body.status).toEqual(updatedTicket.status);
  });

  // test('should return a 400 (because of middleware) status code if there is an error updating a contact', async () => {
  //   const updatedContact = {
  //     title: 'John',
  //     lastname: 'Doe',
  //   };
  //   const res = await request(server).put('/api/contacts/"1"').send(updatedContact);
  //   expect(res.status).toEqual(400);
  //   expect(res.text).toEqual('ID parameter must be a number');
  // });

  test('Should delete ticket', async () => {
    const id = 2;
    const res = await request(server).delete(`/api/tickets/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual(`Ticket with ID ${id} deleted successfully`);
  });

  afterAll(async () => {
    await prismaRepository.clearDatabase();
    await prismaRepository.closeDatabase();
    server.close();
  });
});
