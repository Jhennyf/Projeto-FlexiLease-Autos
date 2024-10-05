import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import Joi from 'joi';
import ReserveController from '../api/controller/ReserveConstroller';

const reserveRoutes = Router();
const reserveController = new ReserveController();

reserveRoutes.get(
  "/reserve",
  reserveController.index
);

reserveRoutes.get(
  "/reserve/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  reserveController.show
);

reserveRoutes.post(
  "/reserve",
  celebrate({
    [Segments.BODY]: {
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      user_id: Joi.number().required(),
      car_id: Joi.number().required(),
    },
  }),
  reserveController.create
);

reserveRoutes.put(
  "/reserve/:id",
  celebrate({
    [Segments.BODY]: {
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      user_id: Joi.number().required(),
      car_id: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  reserveController.update
);

reserveRoutes.delete(
  "/reserve/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  reserveController.delete
);

export default reserveRoutes;
