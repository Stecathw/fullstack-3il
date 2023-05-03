import { Request, Response, NextFunction } from "express";
import { prismaRepository } from "../repository/prismaRepository";
import { TicketStatus } from "@prisma/client";

export const checkDeleteStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticketId = parseInt(req.params.id);
    const ticket = await prismaRepository.getTicketById(ticketId);
    if (ticket?.status === TicketStatus.TERMINE) {
      return res.status(400).json({ message: 'Cannot delete ticket with status TERMINÉ' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error checking ticket status');
  }
};
