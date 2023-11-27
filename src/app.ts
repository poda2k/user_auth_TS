import express  from 'express' ;
import userRoutes from './Routes/User' ;
import connection from './DataBase/Connection';
import User from './DataBase/UserTable';
import sessions from 'express-session';
// import './Models/passport-config' ;
import passport from 'passport';

const app = express() ;


const UserModel =  User.sync() ;
app.use(express.json()) ;
app.use(passport.initialize());
app.use('/',userRoutes) ;

connection.sync()
.then(result => {
    app.listen(5000);
    console.log("All Set") ;
    console.log(result);
}).catch(err => {
    console.log(err) ;
})
