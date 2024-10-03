import { Car } from "@/database/entities/cars";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";

class ListCarService {
  public async execute(): Promise<Car[]> {
    const carRepository = AppDataSource.getRepository(Car);

    const cars = await carRepository.find();

    if(cars.length === 0) {
      throw new AppError("No cars found.", 404);
    }

    return cars;
  }
}

export default ListCarService;
