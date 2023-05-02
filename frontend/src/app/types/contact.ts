export interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  genreId: number;
  Genre: {
    id: number,
    libelle: string
  };
}


export interface EditContact {
  firstname: string;
  lastname: string;
  genreId: number;
}