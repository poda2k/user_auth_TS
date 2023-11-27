import { Request , Response ,NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IJWT } from "./interFaces";



class validation {

    static generateToken(payload : IJWT):string {
        return jwt.sign(payload,'TOPsecretM1',{expiresIn:'1d'}) ;
    }

    static IsAuth(token : string):IJWT {
        let decodedToken : any ;
        
        try{
            decodedToken = jwt.verify(token,'TOPsecretM1');
            
        }catch(err){
            console.log(err) ;
        }
        if(!decodedToken){
            const error = new Error('unauthorized token');
            console.log(error) ;
            throw error ;
            
        }
        return decodedToken ;
    }
}

export default validation ;