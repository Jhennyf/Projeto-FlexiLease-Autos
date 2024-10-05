import { IsNumber, IsString } from 'class-validator';

export class CarDTO {
  @IsString()
  model: string;

  @IsString()
  color: string;

  @IsNumber()
  year: number;

  @IsNumber()
  valuePerDay: number;

  @IsNumber()
  numberOfPassengers: number;
}
