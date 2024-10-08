import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateReserveService from '../services/Reserve/CreateReserveService';
import ListReserveService from '../services/Reserve/ListReserveService';
import ShowReserveService from '../services/Reserve/ShowReserveService';
import UpdateReserveService from '../services/Reserve/UpdateReserveService';
import DeleteReserveService from '../services/Reserve/DeleteReserveService';


export default class ReserveController {
  public async create(req: Request, res: Response): Promise<void> {
    const { startDate, endDate, carId } = req.body;
    const userId = req.user.id;

    const ReserveService = new CreateReserveService();
    const reserve = await ReserveService.execute({
      startDate,
      endDate,
      userId,
      carId,
    });

    res.status(201).json(
      instanceToInstance({
        id: reserve.id,
        startDate: reserve.startDate,
        endDate: reserve.endDate,
        finalValue: reserve.finalValue,
        userId: reserve.user.id,
        carId: reserve.car.id,
      }),
    );
  }

  public async index(req: Request, res: Response): Promise<void> {
    const ReserveService = new ListReserveService();
    const reserves = await ReserveService.execute();

    res.json(instanceToInstance(reserves));
  }

  public async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const ReserveService = new ShowReserveService();
    const reserve = await ReserveService.execute({ id: Number(id) });

    res.json(instanceToInstance(reserve));
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { startDate, endDate, userId, carId } = req.body;

    const ReserveService = new UpdateReserveService();
    const reserve = await ReserveService.execute({
      id: Number(id),
      startDate,
      endDate,
      car_id: carId,
      user_id: userId,
    });

    res.json(instanceToInstance(reserve));
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const ReserveService = new DeleteReserveService();
    await ReserveService.execute({ id: Number(id) });

    res.status(204).send();
  }
}
