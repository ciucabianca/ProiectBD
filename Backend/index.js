import { configApp } from './src/app.js';
import * as dotenv from 'dotenv';

dotenv.config({path: './.env'});
// spin up server
const app = configApp();
app.listen(process.env.port, () => {
  console.log(`listening on ${process.env.PORT}`);
});