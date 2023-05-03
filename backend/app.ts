import express, { Application, Request, Response } from 'express';
import { tickets } from './routes/ticketsRoutes';

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
app.use('/api/tickets', tickets);

app.get('/', async (req: Request, res: Response) => {
  res.status(200).send('Welcome on my  RestAPi, all routes are found under <base_url>/api/tickets/');
});

export {app};