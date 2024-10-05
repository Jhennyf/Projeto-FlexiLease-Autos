import { Car } from '@/database/entities/cars';
import { AppDataSource } from '@/database';
import AppError from '@/api/middlewars/AppError';

interface IRequest {
  model: string;
  color: string;
  year: number;
  valuePerDay: number;
  numberOfPassengers: number;
}

class CreateCarService {
  public async execute({
    model,
    color,
    year,
    valuePerDay,
    numberOfPassengers,
  }: IRequest): Promise<Car> {
    const carRepository = AppDataSource.getRepository(Car);

    await this.checkYearCar(year);
    const car = carRepository.create({
      model,
      color,
      year,
      valuePerDay,
      numberOfPassengers,
    });
    await carRepository.save(car);

    return car;
  }

  public async checkYearCar(year: number): Promise<void> {
    if (year < 1950 || year > 2023) {
      throw new AppError('Year invalid');
    }
  }
}

export default CreateCarService;
