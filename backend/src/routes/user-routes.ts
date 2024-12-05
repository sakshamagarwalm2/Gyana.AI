// Suggested code may be subject to a license. Learn more: ~LicenseLog:827042568.
import express from 'express';
import { getAllUsers } from '../controllers/user-controllers.js';


const userrouter = express.Router();

userrouter.get("/", getAllUsers)


export default userrouter;
