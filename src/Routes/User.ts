import {Router} from 'express' ;
import UserController from '../Controllers/UserController';
import passport from 'passport';
import validation from '../Models/MiddleWare' ;

const router = Router() ;

router.get('/',UserController.getUser) ;
router.post('/',UserController.postUser) ;

router.get('/home',UserController.Home) ;

export default router ;


// ,passport.authenticate('jwt',{session:false})