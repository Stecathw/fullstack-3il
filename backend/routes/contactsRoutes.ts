import { Router, Request, Response } from 'express';
// import {  } from '../middlewares/contactsMiddlewares';
import contactsServices = require('../services/contactsServices')

export const contacts = Router();

// Define an API route to get all contacts and returns a table view.
contacts.get('/', async (req : Request, res : Response) => {
  try {
    const contacts = await contactsServices.getAll();
    res.render('index', { contacts })
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting contacts');
  }
});

// Define a route for getting all contacts
contacts.get('/all', async (req : Request, res : Response) => {
  try {
    const contacts = await contactsServices.getAll();
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting contacts');
  }
});

// Define a route for getting a contact by ID
contacts.get('/:id', async (req : Request, res : Response) => {
  try {
    const { id } = req.params;
    const contact = await contactsServices.getOneById(parseInt(id));
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting contact');
  }
});

// Define an API route for creating new contacts
contacts.post('/', async (req : Request, res : Response) => {
  try {
    const { firstname, lastname, genreId } = req.body;
    const newContact = await contactsServices.createOne({
      firstname,
      lastname,
      genreId,
    });
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating new contact');
  }
});

// Define an API route to update a contact by ID
contacts.put('/:id', async (req : Request, res : Response) => {
  try {
    const { firstname, lastname, genreId } = req.body;
    const contactId = parseInt(req.params.id);
    
    const updatedContact = await contactsServices.updateOne(contactId, {
      firstname,
      lastname,
      genreId,
    });
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating contact');
  }
});

// Define an API route to delete a contact by ID
contacts.delete('/:id', async (req : Request, res : Response) => {
  try {
    const contactId = parseInt(req.params.id);
    await contactsServices.deleteOne(contactId);
    res.status(200).json({message : `Contact with ID ${contactId} deleted successfully`});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting contact');
  }
});
