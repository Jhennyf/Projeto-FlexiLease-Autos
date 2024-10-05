import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./entities/users";
import { Car } from "./entities/cars";
import { Reserve } from "./entities/reserve";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "flexilease.db",
  synchronize: true,
  logging: false,
  migrations: ["src/database/migrations/*.ts"],
  entities: [User, Car, Reserve],
  migrationsTableName: "_migrations",
  migrationsRun: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been INICIOL!");
  })
  .catch((error) => {
    console.error("Error during Data Source NAO INICIA", error);
  });
