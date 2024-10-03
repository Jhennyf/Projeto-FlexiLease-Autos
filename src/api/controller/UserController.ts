import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

import CreateUserService from "../services/User/CreateUserSerivce";
import ListUserService from "../services/User/ListUserService";
import ShowUserService from "../services/User/ShowUserSErvice";
import UpdateUserService from "../services/User/UpdateUserService";
import DeleteUserService from "../services/User/DeleteUserService";


 export default class UserController {
  // Create a new user
  public async  create(req: Request, res: Response): Promise<Response> {
    const { name, cpf, birth, cep, email, password } = req.body;

    const UserService = new CreateUserService();
    const user = await UserService.execute({
      name,
      cpf,
      birth,
      cep,
      email,
      password
    });

    return res.status(201).json(instanceToInstance(user));
  }

  // List all users
  public async index(req: Request, res: Response): Promise<Response> {
    const UserService = new ListUserService();
    const users = await UserService.execute();

    return res.json(instanceToInstance(users));
  }

  // Show a user
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const UserService = new ShowUserService();
    const user = await UserService.execute({ id: Number(id) });

    return res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, cpf, birth, cep, email, password } = req.body;

    const UserService = new UpdateUserService();
    const user = await UserService.execute({
      id: Number(id),
      name,
      cpf,
      birth,
      cep,
      email,
      password
    });

    return res.json(instanceToInstance(user));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const UserService = new DeleteUserService();
    await UserService.execute({ id: Number(id) });

    return res.status(204).send();
  }

 }
