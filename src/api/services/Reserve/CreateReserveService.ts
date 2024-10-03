import { Reserve } from "@/database/entities/reserve";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";

interface IRequest {
  startDate: Date;
  endDate: Date;
  user_id: number;
  car_id: number;
}

class CreateReserveService {
  public async execute({ startDate, endDate, user_id, car_id }: IRequest): Promise<Reserve> {
    const reserveRepository = AppDataSource.getRepository(Reserve);

    const reserveExists = await reserveRepository.findOne({
      where: { user: { id: user_id }, car: { id: car_id } }
    });

    if (reserveExists) {
      throw new AppError("Reservation already made.", 400);
    }

    const reserve = reserveRepository.create({ startDate, endDate, user: { id: user_id }, car: { id: car_id } });

    return reserve;
  }
}

export default CreateReserveService;
