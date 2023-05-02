import { app } from './app';

const dotenv = require('dotenv');

dotenv.config();

const portString = process.env.PORT;
if (!portString) {
  throw new Error('PORT environment variable is not defined');
}
const port = parseInt(portString);
if (isNaN(port)) {
  throw new Error('PORT must be a valid number');
}

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(`⚡️[server]: CORS-enabled.`);
});

export { server };