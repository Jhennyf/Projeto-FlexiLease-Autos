import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateCarService from '../services/Car/CreateCarService';
import ListCarService from '../services/Car/ListCarService';
import ShowCarService from '../services/Car/ShowCarService';
import UpdateCarService from '../services/Car/UpdateCarService';
import DeleteCarService from '../services/Car/DeleteCarService';
import { CarDTO } from '../dto/CarDTO';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export default class CarController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const createCarDto = plainToClass(CarDTO, req.body);
      await validateOrReject(createCarDto);

      const createCarService = new CreateCarService();
      const car = await createCarService.execute(req.body);

      res.status(201).json(car);
    } catch (errors) {
      res.status(400).json({ errors });
    }
  }

  public async index(req: Request, res: Response): Promise<void> {
    const query = req.query;

    const CarService = new ListCarService();
    const cars = await CarService.execute(query);

    res.json(instanceToInstance(cars));
  }

  public async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const CarService = new ShowCarService();
    const car = await CarService.execute({ id: Number(id) });

    res.json(instanceToInstance(car));
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { model, color, year, valuePerDay, numberOfPassengers } = req.body;

    const CarService = new UpdateCarService();
    const car = await CarService.execute({
      id: Number(id),
      model,
      color,
      year,
      valuePerDay,
      numberOfPassengers,
    });

    res.json(instanceToInstance(car));
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleteCarService = new DeleteCarService();
      await deleteCarService.execute({ id: Number(id) });

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
