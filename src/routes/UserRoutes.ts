import express from 'express';
import { celebrate, Segments } from 'celebrate';
import UserController from '@/api/controller/UserController';
import BaseJoi, { Extension, Root } from 'joi';
import joiDate from '@joi/date';

const Joi = BaseJoi.extend(joiDate as unknown as Extension) as Root;


const userRoutes = express.Router();
const userController = new UserController();

//list all users
userRoutes.get(
  "/user",
  userController.index
);

userRoutes.get(
  "/user/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  userController.show
);

userRoutes.post(
  "/user",
  celebrate({
    [Segments.BODY]:{
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      birth: Joi.date().required(),
      cep: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    },
  }),
  userController.create
);


userRoutes.put(
  "/user:id",
  celebrate({
    [Segments.BODY]:{
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      birth: Joi.date().required(),
      cep: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  userController.create
);

userRoutes.delete(
  "/user/:id",
  celebrate({
    [Segments.PARAMS]:{
      id: Joi.number().integer().required(),
    },
  }),
  userController.delete
);

export default userRoutes;
