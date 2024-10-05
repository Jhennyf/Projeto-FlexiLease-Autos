import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateUserService from '../services/User/CreateUserSerivce';
import ListUserService from '../services/User/ListUserService';
import ShowUserService from '../services/User/ShowUserSErvice';
import UpdateUserService from '../services/User/UpdateUserService';
import DeleteUserService from '../services/User/DeleteUserService';
import { UserDTO } from '../dto/UserDTO';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export default class UserController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, cpf, birth, cep, email, password } = req.body;

      const UserService = new CreateUserService();

      const createUserDto = plainToClass(UserDTO, req.body);

      await validateOrReject(createUserDto);

      const user = await UserService.execute({
        name,
        cpf,
        birth,
        cep,
        email,
        password,
      });

      res.status(201).json(instanceToInstance(user));
    } catch (errors) {
      res.status(400).json({ errors });
    }
  }

  public async index(req: Request, res: Response): Promise<void> {
    const UserService = new ListUserService();
    const users = await UserService.execute();

    res.json(instanceToInstance(users));
  }

  public async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const UserService = new ShowUserService();
    const user = await UserService.execute({ id: Number(id) });

    res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<void> {
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
      password,
    });

    res.json(instanceToInstance(user));
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const UserService = new DeleteUserService();
    await UserService.execute({ id: Number(id) });

    res.status(204).send();
  }
}
