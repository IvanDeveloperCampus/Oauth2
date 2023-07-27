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
            clientID: '644360234448-sl459v7m4m7002i9totf5gienvq7ssur.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://127.0.0.1:5002/auth/google/callback'
        },
        authUser
    )
);

var scopes = ['identify'];

passport.use(new DiscordStrategy({
    clientID: '1134092384507006987',
    clientSecret: 'DJzAOEvr67hUpXoMMHtJaz-hFV_WNQiJ',
    callbackURL: 'http://127.0.0.1:5002/auth/discord/callback',
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