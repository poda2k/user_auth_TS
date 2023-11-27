import user from '../DataBase/UserTable' ;

export interface IUser {
    userName : string;
    password : string;
}

export interface IJWT{
    userId : number ;
    userName : string;
}

