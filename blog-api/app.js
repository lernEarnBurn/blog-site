const express = require('express')
const mongoose = require('mongoose');
const crypto = require('crypto')
const passport = require('passport')
const local = require('./authStrats/local')
const session = require('express-session')


const createRouter = require('./routers/create')
const readRouter = require('./routers/read')
const updateRouter = require('./routers/update')
const deleteRouter = require('./routers/delete')
const authRouter = require('./routers/auth')

require('dotenv').config();


mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(
  session({
    secret: crypto.randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user 
  next()
})

app.use('/', authRouter)
app.use('/', createRouter)
app.use('/', readRouter)
app.use('/', updateRouter)
app.use('/', deleteRouter)


app.listen(3000, () => {
  'app listening on port 3000'
})