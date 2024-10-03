import { Car } from "@/database/entities/cars";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";

interface IRequest {
  id: number;
  model: string;
  color: string;
  year: number;
  valuePerDay: number;
  numberOfPassengers: number;
}

class UpdateCarService {
  public async execute({ id, model, color, year, valuePerDay, numberOfPassengers }: IRequest): Promise<Car> {
    const carRepository = AppDataSource.getRepository(Car);

    const car = await carRepository.findOne({
      where: { id }
    });

    if (!car) {
      throw new AppError("Car not found.", 404);
    }

    car.model = model;
    car.color = color;
    car.year = year;
    car.valuePerDay = valuePerDay;
    car.numberOfPassengers = numberOfPassengers;

    await carRepository.save(car);

    return car;
  }
}

export default UpdateCarService;

