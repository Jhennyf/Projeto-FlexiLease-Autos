import { Reserve } from "@/database/entities/reserve";
import { AppDataSource } from "@/database";

class ListReserveService {
  public async execute(): Promise<Reserve[]> {
    const reserveRepository = AppDataSource.getRepository(Reserve);

    const reserves = await reserveRepository.find();

    return reserves;
  }
}

export default ListReserveService;
