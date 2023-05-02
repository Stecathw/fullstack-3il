interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  genreId: number;
}

interface CreateContactInput {
  firstname: string;
  lastname: string;
  genreId: number;
}

export { Contact, CreateContactInput };
