import { Request, Response, NextFunction } from "express";
import {body, ValidationChain, validationResult} from "express-validator";

const validate = (validations:ValidationChain[])=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        for (let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()){
                break;
            }
        }

        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }

        return res.status(422).json({errors:errors.array()});
    };   
};

const loginValidator = [
    body("email").trim().isEmail().withMessage("E-MAIL") ,
    body("password").trim().isLength({min:8}).withMessage("RAAZ"),
];

const signupValidator = [
    body("name").notEmpty().withMessage("PLS INSERT UR NAME"),
    ...loginValidator,
];

export {validate, signupValidator, loginValidator};
