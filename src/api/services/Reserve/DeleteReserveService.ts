import { Reserve } from "@/database/entities/reserve";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";

interface IRequest {
  id: number;
}

class DeleteReserveService {
  public async execute({ id }: IRequest): Promise<void> {
    const reserveRepository = AppDataSource.getRepository(Reserve);

    const reserve = await reserveRepository.findOne({
      where: { id }
    });

    if (!reserve) {
      throw new AppError("Reservation not found.", 404);
    }

    await reserveRepository.remove(reserve);
  }
}

export default DeleteReserveService;
