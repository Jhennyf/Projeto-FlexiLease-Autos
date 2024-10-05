import { IsDate, IsNumber, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsDate()
  birth: Date;

  @IsString()
  cep: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
