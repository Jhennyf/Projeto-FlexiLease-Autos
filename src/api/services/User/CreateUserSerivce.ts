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
      throw new AppError('User registered.', 400);
    }

    if (password.length < 6) {
      throw new AppError('Password at 6 characters.', 400);
    }

    if (!this.isAdult(birth)) {
      throw new AppError('User must be at least 18 years old.', 400);
    }


    if (cpf.length !== 14) {
      throw new AppError('CPF Invalid.', 400);
    }

    const emailExists = await userRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      throw new AppError('Email registered.', 400);
    }

    const cepData = await this.consultarCEP(cep);
    if (!cepData) {
      throw new AppError('CEP Invalid.', 400);
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
        console.log('CEP not found.');
        return null;
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Request error:', error.message);
      } else {
        console.error('Error', error);
      }
      return null;
    }
  }



  private isAdult(birth: Date): boolean {
    const currentYear = 2024;
    const birthYear = birth.getFullYear();
    const age = currentYear - birthYear;

    return age >= 18;
    }
}

export default CreateUserService;
