import { Car } from '@/database/entities/cars';
import { AppDataSource } from '@/database';
import AppError from '@/api/middlewars/AppError';
import { FindOptionsWhere } from 'typeorm';

interface IQuery {
  [key: string]: any;
}

class ListCarService {
  public async execute(query: IQuery): Promise<Car[]> {
    const carRepository = AppDataSource.getRepository(Car);

    const cars = await carRepository.find({
      where: query as FindOptionsWhere<Car>,
    });

    if (cars.length === 0) {
      throw new AppError('No cars found.', 404);
    }

    return cars;
  }
}
export default ListCarService;
