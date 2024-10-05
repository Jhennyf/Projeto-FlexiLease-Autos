import { User } from "@/database/entities/users";
import { AppDataSource } from "@/database";
import AppError from "@/api/middlewars/AppError";

class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find({
      relations: ["reserves"],
    });

    if(users.length === 0) {
      throw new AppError("No users found.", 404);
    }

    return users;
  }
}

export default ListUserService;
