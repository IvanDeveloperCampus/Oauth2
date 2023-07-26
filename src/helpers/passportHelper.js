// passportHelper.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const authUser = (accessToken, refreshToken, profile, done) => {
    //console.log("accessToken", accessToken); // AccesToken es el token que le permite a nuestra aplicación acceder a los datos del usuario
    //console.log("refreshToken", refreshToken); // RefreshToken es el token que le permite a nuestra aplicación obtener un nuevo accessToken cuando el actual expire
     //console.log("profile", profile); // Profile es el objeto que contiene los datos del usuario
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
passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

export default passport;