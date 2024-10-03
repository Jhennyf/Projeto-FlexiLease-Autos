import { User } from '@/database/entities/users';
import { AppDataSource } from '@/database';
import AppError from '@/api/middlewars/AppError';

interface IRequest {
  name: string;
  cpf: string;
  birth: Date;
  cep: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, cpf, birth, cep, email, password }: IRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOne({
      where: { name }
    });

    if (userExists) {
      throw new AppError("User already registered.", 400);
    }

    const user = userRepository.create({ name, cpf, birth, cep, email, password });
    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
