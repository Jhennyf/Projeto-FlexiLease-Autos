import { Reserve } from "@/database/entities/reserve";
import { User } from "@/database/entities/users";
import { Car } from "@/database/entities/cars";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";

interface IRequest {
  id: number;
  startDate: Date;
  endDate: Date;
  user_id: number;
  car_id: number;
}

class UpdateReserveService {
  public async execute({ id, startDate, endDate, user_id, car_id }: IRequest): Promise<Reserve | null> {
    const reserveRepository = AppDataSource.getRepository(Reserve);
    const userRepository = AppDataSource.getRepository(User);
    const carRepository = AppDataSource.getRepository(Car);

    const reserve = await reserveRepository.findOne({
      where: { id }
    });

    if (!reserve) {
      throw new AppError("Reservation not found.", 404);
    }

    const user = await userRepository.findOne({
      where: { id: user_id }
    });

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const car = await carRepository.findOne({
      where: { id: car_id }
    });

    if (!car) {
      throw new AppError("Car not found.", 404);
    }

    const reserveExists = await reserveRepository.findOne({
      where: { user: { id: user_id }, car: { id: car_id } }
    });

    if (reserveExists && reserveExists.id !== id) {
      throw new AppError("Reservation already made.", 400);
    }

    reserve.startDate = startDate;
    reserve.endDate = endDate;
    reserve.user = user;
    reserve.car = car;

    await reserveRepository.save(reserve);

    return reserve;
  }
}

export default UpdateReserveService;
