import express, { Application, Request, Response } from 'express';
import { contacts } from './routes/contactsRoutes';

const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app: Application = express();

const allowed = JSON.parse(process.env.ALLOWED ||'{}');
if (!allowed) {
  throw new Error('CORS must be set');
}
const corsOptions = {
  origin: allowed,
  methods: 'GET, POST, PUT, DELETE',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json());
app.set('view engine', 'ejs');  

// Routes for the main RESTApi
app.use('/api/contacts', contacts);

app.get('/', async (req: Request, res: Response) => {
  res.status(200).send('Welcome on my  RestAPi, all routes are found under <base_url>/api/<your_api_route>/');
});

export {app};