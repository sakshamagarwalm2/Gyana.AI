// Suggested code may be subject to a license. Learn more: ~LicenseLog:3069039547.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1075016910.
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import approuter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env file

const app = express();

//middlewares
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3782434983.
app.use(cors({ origin: "http://localhost:5173/", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
app.use(morgan('dev'));

app.use("/api/v1", approuter);

export default app;
