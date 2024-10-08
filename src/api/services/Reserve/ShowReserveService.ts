import { Reserve } from '@/database/entities/reserve';
import { AppDataSource } from '@/database';
import AppError from '@/api/middlewars/AppError';
import IResponse from '../../dto/ResponseReserveDTO';

interface IRequest {
  id: number;
}

class ShowReserveService {
  public async execute({ id }: IRequest): Promise<IResponse> {
    const reserveRepository = AppDataSource.getRepository(Reserve);

    const reserve = await reserveRepository.findOne({
      where: { id },
      relations: ["car", "user"]
    });

    if (!reserve) {
      throw new AppError('Reserve not found.', 404);
    }

    if (!reserve.car) {
      throw new AppError('Car not found for the reserve.', 404);
    }

    const finalValue = await this.verifyValue(reserve.startDate, reserve.endDate, reserve.car.valuePerDay);

    const response: IResponse = {
      id: reserve.id.toString(),
      startDate: reserve.startDate,
      endDate: reserve.endDate,
      finalValue,
      userId: reserve.user.id,
      carId: reserve.car.id,
    };

    return response;
  }

  private async verifyValue(starDate: Date, endDate: Date, valueDay: number): Promise<string> {
    const date1 = new Date(starDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const value = diffDays * valueDay;
    return value.toFixed(2);
  }
}

export default ShowReserveService;
