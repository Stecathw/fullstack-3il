import { Router, Request, Response } from 'express';
import ticketsServices = require('../services/ticketsServices')

export const tickets = Router();

// Define an API route to get all tickets and returns a table view.
tickets.get('/', async (req : Request, res : Response) => {
  try {
    const tickets = await ticketsServices.getAll();
    res.render('index', { tickets })
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting tickets');
  }
});

// Define a route for getting all tickets
tickets.get('/all', async (req : Request, res : Response) => {
  try {
    const tickets = await ticketsServices.getAll();
    res.status(200).json(tickets);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting tickets');
  }
});

// Define a route for getting a ticket by ID
tickets.get('/:id', async (req : Request, res : Response) => {
  try {
    const { id } = req.params;
    const ticket = await ticketsServices.getOneById(parseInt(id));
    if (!ticket) {
      return res.status(404).send('Ticket not found');
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting ticket');
  }
});

// Define an API route for creating new tickets
tickets.post('/', async (req : Request, res : Response) => {
  try {
    const { title, description } = req.body;
    const newticket = await ticketsServices.createOne({
      title,
      description,
    });
    res.status(201).json(newticket);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating new ticket');
  }
});

// Define an API route to update a contact by ID
tickets.put('/:id', async (req : Request, res : Response) => {
  try {
    const { title, description, status} = req.body;

    const ticketId = parseInt(req.params.id);
    
    const updatedTicket = await ticketsServices.updateOne(ticketId, {
      title,
      description,
      status,
    });
    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating ticket');
  }
});

// Define an API route to delete a ticket by ID
tickets.delete('/:id', async (req : Request, res : Response) => {
  try {
    const ticketId = parseInt(req.params.id);
    await ticketsServices.deleteOne(ticketId);
    res.status(200).json({message : `Ticket with ID ${ticketId} deleted successfully`});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting ticket');
  }
});
