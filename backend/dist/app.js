import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import approuter from './routes/index.js';
dotenv.config(); // Load environment variables from .env file
const app = express();
//middlewares
app.use(express.json());
//remove it in production
app.use(morgan('dev'));
app.use("api/v1", approuter);
export default app;
//# sourceMappingURL=app.js.map