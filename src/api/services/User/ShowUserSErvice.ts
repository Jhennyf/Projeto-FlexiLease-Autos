import { User } from "@/database/entities/users";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";

interface IRequest {
  id: number;
}

class ShowUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
      relations: ["reserves"],
    });

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return user;
  }
}

export default ShowUserService;
