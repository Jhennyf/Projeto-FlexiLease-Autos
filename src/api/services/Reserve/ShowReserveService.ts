import { Reserve } from '@/database/entities/reserve';
import { AppDataSource } from '@/database';
import AppError from '@/api/middlewars/AppError';
import e from 'express';

interface IRequest {
  id: number;
}

class ShowReserveService {
  public async execute({ id }: IRequest): Promise<Reserve> {
    const reserveRepository = AppDataSource.getRepository(Reserve);

    const reserve = await reserveRepository.findOne({
      where: { id }
    });

    if (!reserve) {
      throw new AppError('Reserve not found.', 404);
    }

    return reserve;
  }
}

export default ShowReserveService;
