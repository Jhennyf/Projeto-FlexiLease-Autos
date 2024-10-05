import { Car } from '@/database/entities/cars';
import { AppDataSource } from '@/database';
import AppError from '@/api/middlewars/AppError';

interface IRequest {
  id: number;
  model: string;
  color: string;
  year: number;
  valuePerDay: number;
  numberOfPassengers: number;
}

class UpdateCarService {
  public async execute({
    id,
    model,
    color,
    year,
    valuePerDay,
    numberOfPassengers,
  }: IRequest): Promise<Car> {
    const carRepository = AppDataSource.getRepository(Car);

    const car = await carRepository.findOne({
      where: { id },
    });

    await this.checkYearCar(year);
    await this.checkId(id);

    if (!car) {
      throw new AppError('Car not found.', 404);
    }

    car.model = model;
    car.color = color;
    car.year = year;
    car.valuePerDay = valuePerDay;
    car.numberOfPassengers = numberOfPassengers;

    await carRepository.save(car);

    return car;
  }
  public async checkYearCar(year: number): Promise<void> {
    if (year < 1950 || year > 2023) {
      throw new AppError('Year invalid');
    }
  }

  public async checkId(id: number): Promise<void> {
    if (id === undefined || id === null) {
      throw new AppError('Invalid ID.', 400);
    }

    if (id <= 0) {
      throw new AppError('Invalid ID.', 400);
    }
  }
}

export default UpdateCarService;
