// index.js
import express from 'express';
import session from 'express-session';
import passportHelper from './helpers/passportHelper.js'

const app = express();

app.use(session({
    secret: 'CLAVE_SECRETA_ENV', 
    resave: false, 
    saveUninitialized: false 
}))

app.use(passportHelper.initialize()); // Inicializa passport
app.use(passportHelper.session()); // Permite que passport use "express-session" para almacenar la sesión del usuario

//Endpoints de autenticacion
app.get("/auth/google", passportHelper.authenticate('google', { scope: ['email'] }));

app.get("/auth/google/callback", passportHelper.authenticate('google', 
{ 
    failureRedirect: '/auth/google',
    successRedirect: '/saludo'
}));


app.get("/logout", (req, res) => {
    req.logout({}, err => console.log(err));
    res.redirect('/auth/google');
});

//Middleware para comprobar si esta autenticado
const checkAuthentication = (req, res, next) =>
        req.isAuthenticated() ? next() : res.redirect("/auth/google");

app.get("/saludo", checkAuthentication, (req, res) => res.send("Bienvenido a tu cuenta"))

app.listen(5002, () => {
    console.log(`Example app listening on http://localhost:5002/auth/google`);
});