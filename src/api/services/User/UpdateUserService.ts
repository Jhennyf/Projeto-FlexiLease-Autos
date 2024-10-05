import { User } from "@/database/entities/users";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";

interface IRequest {
  id: number;
  name: string;
  cpf: string;
  birth: Date;
  cep: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, cpf, birth, cep, email, password }: IRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const userExistsName = await userRepository.findOne({
      where: { name }
    });

    if (userExistsName && name !== user.name) {
      throw new AppError("User already registered.", 400);
    }

    user.name = name;
    user.cpf = cpf;
    user.birth = birth;
    user.cep = cep;
    user.email = email;
    user.password = password;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
