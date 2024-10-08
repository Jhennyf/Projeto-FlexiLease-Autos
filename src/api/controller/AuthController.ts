import { Request, Response } from 'express';
import generateToken from '../utils/generateToken';
import AppError from '../middlewars/AppError';
import ShowUserService from '../services/User/ShowUserSErvice';

export default class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Dados errados.', 400);
    }

    const userService = new ShowUserService();

    const user = await userService.findByEmail(email);

    if (!user || user.password !== password) {
      throw new AppError('Credenciais inválidas.', 400);
    }

    const token = generateToken(user.id);

    res.status(200).json({ accessToken: token });
  }
}
