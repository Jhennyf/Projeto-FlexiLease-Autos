import { Car } from '@/database/entities/cars';
import { AppDataSource } from '@/database';
import AppError from '@/api/middlewars/AppError';

interface IRequest {
  id: number;
}

class ShowCarService {
  public async execute({ id }: IRequest): Promise<Car> {
    const carRepository = AppDataSource.getRepository(Car);

    const car = await carRepository.findOne({
      where: { id },
    });

    if (!car) {
      throw new AppError('Car not found.', 404);
    }

    return car;
  }
}

export default ShowCarService;
