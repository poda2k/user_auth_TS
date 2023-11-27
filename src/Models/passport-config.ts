import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User  from '../DataBase/UserTable'; // Import your User model


const JWTsecret = 'TOPsecretM1' ;

const JWToptoins = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrOkey : JWTsecret
}

passport.use(
    new JwtStrategy(JWToptoins,async(payload,done) => {
        try {
            const user = await User.findByPk(payload.sub) ;
            if(!user){
                return done(null,false);
            }
            return done(null,user) ;
        } catch (error) {
            return done(error,false);
        }
    })
)