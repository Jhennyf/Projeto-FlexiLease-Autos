import { Car } from "@/database/entities/cars";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";

interface IRequest {
  model: string;
  color: string;
  year: number;
  valuePerDay: number;
  numberOfPassengers: number;
}

class CreateCarService {
  public async execute({ model, color, year, valuePerDay, numberOfPassengers }: IRequest): Promise<Car> {
    const carRepository = AppDataSource.getRepository(Car);

    const carExists = await carRepository.findOne({
      where: { model }
    });

    if (carExists) {
      throw new AppError("Car already registered.", 400);
    }

    const car = carRepository.create({ model, color, year, valuePerDay, numberOfPassengers });
    await carRepository.save(car);

    return car;
  }
}

export default CreateCarService;


