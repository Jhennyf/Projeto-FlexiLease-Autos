import { User } from "@/database/entities/users";
import AppError from "@/api/middlewars/AppError";
import { AppDataSource } from "@/database";

interface IRequest {
  id: number;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id }
    });

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    await userRepository.remove(user);
  }
}

export default DeleteUserService;
