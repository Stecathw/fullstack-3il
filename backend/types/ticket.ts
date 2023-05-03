// export enum TicketStatus {
//   A_FAIRE,
//   EN_COURS,
//   TERMINE,
// }

export type TicketStatus = 'A_FAIRE' | 'EN_COURS' | 'TERMINE';


export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
}

export interface CreateTicket {
  title: string;
  description: string;
}

export interface UpdateTicket {
  title: string;
  description: string;
  status: TicketStatus;
}