// passportHelper.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as DiscordStrategy} from 'passport-discord'

const authUser = (accessToken, refreshToken, profile, done) => {
    console.log("accessToken", accessToken); // AccesToken es el token que le permite a nuestra aplicación acceder a los datos del usuario
    console.log("refreshToken", refreshToken); // RefreshToken es el token que le permite a nuestra aplicación obtener un nuevo accessToken cuando el actual expire
     console.log("profile", profile); // Profile es el objeto que contiene los datos del usuario
    done(null, profile);
  };

passport.use(
    new GoogleStrategy(
        {
            clientID: '',
            clientSecret: '',
            callbackURL: ''
        },
        authUser
    )
);

var scopes = ['identify'];

passport.use(new DiscordStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    scope: scopes
}, (accestoken, refreshtoken, profile, cb) =>{
    process.nextTick(() => {
        console.log(profile);
        return cb(null, profile)
    })
}))


passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

export default passport;
