import { Reserve } from "@/database/entities/reserve";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";
import { User } from "@database/entities/users";
import { Car } from "@/database/entities/cars";

interface IRequest {
  startDate: Date;
  endDate: Date;
  user_id: number;
  car_id: number;
}

class CreateReserveService {
  public async execute({ startDate, endDate, user_id, car_id }: IRequest): Promise<Reserve> {
    const reserveRepository = AppDataSource.getRepository(Reserve);
    const userRepository = AppDataSource.getRepository(User);
    const carRepository = AppDataSource.getRepository(Car);

    const user = await userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const car = await carRepository.findOne({ where: {id:car_id  }});
    if (!car) {
      throw new AppError('Car not found', 404);
    }

    const reserve = reserveRepository.create({ startDate, endDate, user, car });
    console.log(reserve);

    await reserveRepository.save(reserve);

    return reserve;
  }
}


export default CreateReserveService;
