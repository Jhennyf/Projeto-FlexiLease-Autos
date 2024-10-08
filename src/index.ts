import express, { Request, Response, NextFunction } from "express";
import 'reflect-metadata';
import "express-async-errors";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import "./database/index";
import { errors } from 'celebrate';
import userRoutes from "./routes/UserRoutes";
import carRoutes from './routes/CarRoutes';
import reserveRoutes from './routes/ReserveRoutes';
import AppError from "../src/api/middlewars/AppError";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;



app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/v1', userRoutes);
app.use('/v1', carRoutes);
app.use('/v1', reserveRoutes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        code: error.statusCode,
        status: error.statusMessage,
        message: error.message,
      });
    }

    return response.status(500).json({
      code: 500,
      status: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado',
    });
  }
);

app.listen(port, () => {
  console.log(`Server rodando na porta http://localhost:${port}`);
});

export default app;
