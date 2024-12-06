import jwt from "jsonwebtoken";

export const createToken = (id:string,email:string,expiresIn) =>{
    const paylosd = {id,email};
    const token =  jwt.sign(paylosd,process.env.JWT_SECRET,{expiresIn});

    return token ;

}