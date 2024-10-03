import { Reserve } from "@/database/entities/reserve";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";

class ListReserveService {
  public async execute(): Promise<Reserve[]> {
    const reserveRepository = AppDataSource.getRepository(Reserve);

    const reserves = await reserveRepository.find({
      relations: ["user", "car"],
    });

    if(reserves.length === 0) {
      throw new AppError("No reserves found.", 404);
    }

    return reserves;
  }
}

export default ListReserveService;
