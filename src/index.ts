import 'reflect-metadata';
import "express-async-errors"
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import "./database/index"

import userRoutes from "./routes/UserRoutes"


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/v1', userRoutes)


app.listen(port, () => {
  console.log(`Server rodando na porta http://localhost:${port}`);
});
