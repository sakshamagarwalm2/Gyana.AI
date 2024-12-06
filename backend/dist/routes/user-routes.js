// Suggested code may be subject to a license. Learn more: ~LicenseLog:827042568.
import express from 'express';
import { UserLogin, UserSignup, getAllUsers } from '../controllers/user-controllers.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js';
const userrouter = express.Router();
userrouter.get("/", getAllUsers);
userrouter.post("/signup", validate(signupValidator), UserSignup);
userrouter.post("/login", validate(loginValidator), UserLogin);
export default userrouter;
//# sourceMappingURL=user-routes.js.map