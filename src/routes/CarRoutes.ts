import express from 'express';
import { celebrate, Segments } from 'celebrate';
import CarController from '@/api/controller/CarController';
import BaseJoi, { Extension, Root } from 'joi';
import joiDate from '@joi/date';

const Joi = BaseJoi.extend(joiDate as unknown as Extension) as Root;

const carRoutes = express.Router();
const carController = new CarController();

carRoutes.get(
  "/car",
  carController.index
);

carRoutes.get(
  "/car/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  carController.show
);

carRoutes.post(
  "/car",
  celebrate({
    [Segments.BODY]: {
      model: Joi.string().required(),
      color: Joi.string().required(),
      year: Joi.number().required(),
      valuePerDay: Joi.number().required(),
      numberOfPassengers: Joi.number().required(),
    },
  }),
  carController.create
);

carRoutes.put(
  "/car/:id",
  celebrate({
    [Segments.BODY]: {
      model: Joi.string().required(),
      color: Joi.string().required(),
      year: Joi.number().required(),
      valuePerDay: Joi.number().required(),
      numberOfPassengers: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  carController.update
);

carRoutes.delete(
  "/car/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  carController.delete
);

export default carRoutes;
