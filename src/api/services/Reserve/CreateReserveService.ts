import { Reserve } from "@/database/entities/reserve";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";
import { User } from "@database/entities/users";
import { Car } from "@/database/entities/cars";

interface IRequest {
  startDate: string;
  endDate: string;
  userId: number;
  carId: number;
}

class CreateReserveService {
  public async execute({
    startDate,
    endDate,
    userId,
    carId,
  }: IRequest): Promise<Reserve> {
    const reserveRepository = AppDataSource.getRepository(Reserve);
    const userRepository = AppDataSource.getRepository(User);
    const carRepository = AppDataSource.getRepository(Car);

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const car = await carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new AppError('Car not found', 404);
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const userReservations = await reserveRepository.find({
      where: { user: { id: userId } },
    });
    userReservations.forEach(reservation => {
      const resStart = new Date(reservation.startDate);
      const resEnd = new Date(reservation.endDate);
      if (
        (start >= resStart && start <= resEnd) ||
        (end >= resStart && end <= resEnd)
      ) {
        throw new AppError(
          'User already has a reservation in this period',
          400,
        );
      }
    });

    const carReservations = await reserveRepository.find({
      where: { car: { id: carId } },
    });
    carReservations.forEach(reservation => {
      const resStart = new Date(reservation.startDate);
      const resEnd = new Date(reservation.endDate);
      if (
        (start >= resStart && start <= resEnd) ||
        (end >= resStart && end <= resEnd)
      ) {
        throw new AppError('Car is already reserved in this period', 400);
      }
    });

    const days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    const finalValue = (days * car.valuePerDay).toFixed(2);

    const reserve = reserveRepository.create({
      startDate,
      endDate,
      user,
      car,
      finalValue,
    });

    await reserveRepository.save(reserve);

    return reserve;
  }
}

export default CreateReserveService;
