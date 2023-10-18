const express = require('express')

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express()


app.get('/poop/pea', (req, res) => {
  res.json('hello world')
})

app.listen(3000, () => {
  'app listening on port 3000'
})