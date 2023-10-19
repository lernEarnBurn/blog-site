const express = require('express')

const createRouter = require('./routers/createRouter')
const readRouter = require('./routers/readRouter')
const updateRouter = require('./routers/updateRouter')
const deleteRouter = require('./routers/deleteRouter')

require('dotenv').config();

const mongoose = require('mongoose');
const { create } = require('./models/comment')
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express()

app.use('/', createRouter)
app.use('/', readRouter)
app.use('/', updateRouter)
app.use('/', deleteRouter)


app.listen(3000, () => {
  'app listening on port 3000'
})