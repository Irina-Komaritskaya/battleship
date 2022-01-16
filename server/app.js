import express from "express";
import bodyParser from 'body-parser';
import config from 'config';
import mongoose from 'mongoose';
import WarshipGame from './models/warship-game.js';
import warshipGameRoutes from './routes/warship-game.js';

const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(warshipGameRoutes)

start();

async function start() {
  try {
    await connectMongo();
    await runApp();
  } catch (e) {
    console.log(e)
  }
}

async function connectMongo() {
  const uri = config.get('mongodb.url');
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
}

async function runApp() {
  const port = config.get('port') || 3000;
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
}