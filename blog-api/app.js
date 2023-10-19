const express = require('express')
const mongoose = require('mongoose');

const createRouter = require('./routers/createRouter')
const readRouter = require('./routers/readRouter')
const updateRouter = require('./routers/updateRouter')
const deleteRouter = require('./routers/deleteRouter')
const authRouter = require('./routers/authRouter')

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

app.use('/', authRouter)
app.use('/', createRouter)
app.use('/', readRouter)
app.use('/', updateRouter)
app.use('/', deleteRouter)


app.listen(3000, () => {
  'app listening on port 3000'
})