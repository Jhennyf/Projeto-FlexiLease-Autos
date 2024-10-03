import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";

import CreateCarService from "../services/Car/CreateCarService";
import ListCarService from "../services/Car/ListCarService";
import ShowCarService from "../services/Car/ShowCarService";
import UpdateCarService from "../services/Car/UpdateCarService";
import DeleteCarService from "../services/Car/DeleteCarService";


export default class CarController {
  // Create a new car
  public async create(req: Request, res: Response): Promise<Response> {
    const { model, color, year, valuePerDay, numberOfPassengers } = req.body;

    const CarService = new CreateCarService();
    const car = await CarService.execute({
      model,
      color,
      year,
      valuePerDay,
      numberOfPassengers
    });

    return res.status(201).json(instanceToInstance(car));
  }

  // List all cars
  public async index(req: Request, res: Response): Promise<Response> {
    const CarService = new ListCarService();
    const cars = await CarService.execute();

    return res.json(instanceToInstance(cars));
  }

  // Show a car
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const CarService = new ShowCarService();
    const car = await CarService.execute({ id: Number(id) });

    return res.json(instanceToInstance(car));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { model, color, year, valuePerDay, numberOfPassengers } = req.body;

    const CarService = new UpdateCarService();
    const car = await CarService.execute({
      id: Number(id),
      model,
      color,
      year,
      valuePerDay,
      numberOfPassengers
    });

    return res.json(instanceToInstance(car));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const CarService = new DeleteCarService();
    await CarService.execute({ id: Number(id) });

    return res.status(204).send();
  }
}
