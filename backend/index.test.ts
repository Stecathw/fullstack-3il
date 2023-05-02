import {describe, expect, test, afterAll} from '@jest/globals';
import request from 'supertest';
import {server} from './index';
import { prismaRepository } from './repository/prismaRepository';

describe('Test the root path', () => {

  test('It should respond 200 to the GET method', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
  });

  test('It should return the welcome message', async () => {
    const response = await request(server).get('/');
    expect(response.text).toBe(
      'Welcome on my  RestAPi, all routes are found under <base_url>/api/<your_api_route>/'
    );
  });

  test('should return a list of contacts', async () => {
    const res = await request(server).get('/api/contacts/all');
    expect(res.status).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('should return a single contact', async () => {
    const res = await request(server).get('/api/contacts/1');
    expect(res.status).toEqual(200);
    expect(res.body.firstname).toBeDefined();
    expect(res.body.lastname).toBeDefined();
    expect(res.body.genreId).toBeDefined();
  });

  test('should return a 404 status code if the contact does not exist', async () => {
    const res = await request(server).get('/api/contacts/9999');
    expect(res.status).toEqual(404);
    expect(res.text).toEqual('Contact not found');
  });

  test('should create a new contact', async () => {
    const newContact = {
      firstname: 'Peter',
      lastname: 'Parker',
      genreId: 1,
    };
    const res = await request(server).post('/api/contacts').send(newContact);
    expect(res.status).toEqual(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstname).toEqual(newContact.firstname);
    expect(res.body.lastname).toEqual(newContact.lastname);
    expect(res.body.genreId).toEqual(newContact.genreId);
  });

  // test('should return a 400 (because of middleware) status code if there is an error creating a new contact', async () => {
  //   const newContact = {
  //     firstname: 'Toto',
  //     lastname: 'Titi',
  //   };
  //   const res = await request(server).post('/api/contacts').send(newContact);
  //   expect(res.status).toEqual(400);
  //   expect(res.text).toEqual('Missing required fields in request body');
  // });

  test('should update a contact', async () => {
    const updatedContact = {
      id: 1,
      firstname: 'John',
      lastname: 'Repool',
      genreId: 3
    };
    const res = await request(server).put('/api/contacts/1').send(updatedContact);
    expect(res.status).toEqual(200);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstname).toEqual(updatedContact.firstname);
    expect(res.body.lastname).toEqual(updatedContact.lastname);
    expect(res.body.genreId).toEqual(updatedContact.genreId);
  });

  // test('should return a 400 (because of middleware) status code if there is an error updating a contact', async () => {
  //   const updatedContact = {
  //     firstname: 'John',
  //     lastname: 'Doe',
  //   };
  //   const res = await request(server).put('/api/contacts/"1"').send(updatedContact);
  //   expect(res.status).toEqual(400);
  //   expect(res.text).toEqual('ID parameter must be a number');
  // });

  test('Should delete user', async () => {
    const id = 2;
    const res = await request(server).delete(`/api/contacts/${id}`);
    expect(res.status).toEqual(200);
    expect(res.body.message).toEqual(`Contact with ID ${id} deleted successfully`);
  });

  afterAll(async () => {
    await prismaRepository.clearDatabase();
    await prismaRepository.closeDatabase();
    server.close();
  });
});
