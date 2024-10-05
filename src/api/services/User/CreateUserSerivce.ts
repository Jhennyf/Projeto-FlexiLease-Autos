import { User } from '@/database/entities/users';
import { AppDataSource } from '@/database';
import AppError from '@/api/middlewars/AppError';
import axios from 'axios';

interface IRequest {
  name: string;
  cpf: string;
  birth: Date;
  cep: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    cpf,
    birth,
    cep,
    email,
    password,
  }: IRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOne({
      where: { cpf },
    });

    if (userExists) {
      throw new AppError('User already registered.', 400);
    }

    const cepData = await this.consultarCEP(cep);
    if (!cepData) {
      throw new AppError('Invalid CEP.', 400);
    }

    const user = userRepository.create({
      name,
      cpf,
      birth,
      cep,
      email,
      password,
      qualified: true,
      neighbordhood: cepData.bairro,
      street: cepData.logradouro,
      complement: cepData.complemento,
      city: cepData.localidade,
      uf: cepData.uf,
    });

    await userRepository.save(user);

    return user;
  }

  private async consultarCEP(cep: string) {
    try {
      const cepFormatado = cep.replace(/\D/g, '');

      const response = await axios.get(
        `https://viacep.com.br/ws/${cepFormatado}/json/`,
      );

      if (response.data.erro) {
        console.log('CEP não encontrado.');
        return null;
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro na requisição:', error.message);
      } else {
        console.error('Erro desconhecido:', error);
      }
      return null;
    }
  }
}

export default CreateUserService;
