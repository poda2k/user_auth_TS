import { Request , Response ,NextFunction } from 'express';
import {IUser} from '../Models/interFaces' ;
import {IJWT} from '../Models/interFaces' ;
import jwt from 'jsonwebtoken';
import userModel from '../DataBase/UserTable' ;
import validation from "../Models/MiddleWare";

class UserController {
    
    static Validator(token : string):IJWT { //     gets called for every function that needs to protection since i cant make the token =\/ 
        try{                                //     stored in the middleware , looking forward to improve myself .
        const tokenWithoutBearer = token.replace('Bearer ', ''); 
        const decodedToken = validation.IsAuth(tokenWithoutBearer);

        return decodedToken ;
        }catch(e){
            throw new Error(`Invalid token`) ;
        }
    }

    static async getUser(req: Request, res: Response):Promise<void>{

        const getAllUsers = await userModel.findAll() ;

        res.json({massage:"sucess" , Users : getAllUsers}) ;
    }

    static async postUser(req: Request, res: Response):Promise<void>{
        let userData : IUser = {
            userName : req.body.username ,
            password : req.body.password
        }

        const check : userModel | null = await userModel.findOne({  // IT MIGHT RETURN A NULL VALUE !!!!!!
            where:{
                username : userData.userName
            }
        });

        if(check == null){

           const createdUser = await userModel.create({
                userName: userData.userName,
                password: userData.password
            });
            const TOKEN =   validation.generateToken({userId : createdUser.id , userName: createdUser.userName}) ;
           
            res.json({massage:"user Created successfully" , Users : userData  , token : TOKEN}); ;
        }else if(check !=null){
            res.json({massage:"User already exists" , Users : check}) ;
        }


        }

        static Home(req : Request, res : Response , next : NextFunction):void{
            const token = req.header('Authorization') as string;
            const decodedToken : IJWT | null= UserController.Validator(token) ;
            if(decodedToken==null){
                res.status(401).json({ message: 'Invalid token' });
            }
                res.json({ message: `Welcome, user ${decodedToken.userName}` });
        }
    }



export default UserController;