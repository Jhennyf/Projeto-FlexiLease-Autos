import { Car } from '@/database/entities/cars';
import { AppDataSource } from '@/database';
import AppError from '@/api/middlewars/AppError';

interface IRequest {
  id: number;
}

class DeleteCarService {
  public async execute({ id }: IRequest): Promise<void> {
    const carRepository = AppDataSource.getRepository(Car);

    await this.checkId(id);
    const car = await carRepository.findOne({
      where: { id },
    });

    if (!car) {
      throw new AppError('Car not found.', 404);
    }

    await carRepository.remove(car);
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

export default DeleteCarService;
