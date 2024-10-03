import {Request, Response} from 'express';
import { instanceToInstance } from 'class-transformer';

import CreateReserveService from '../services/Reserve/CreateReserveService';
import ListReserveService from '../services/Reserve/ListReserveService';
import ShowReserveService from '../services/Reserve/ShowReserveService';
import UpdateReserveService from '../services/Reserve/UpdateReserveService';
import DeleteReserveService from '../services/Reserve/DeleteReserveService';

export default class ReserveController {
  // Create a new reserve
  public async create(req: Request, res: Response): Promise<Response> {
    const {startDate, endDate, carId, userId,  } = req.body;

    const ReserveService = new CreateReserveService();
    const reserve = await ReserveService.execute({

      startDate,
      endDate,
      car_id: carId,
      user_id: userId,
    });

    return res.status(201).json(instanceToInstance(reserve));
  }
 // List all reserves

 public async index(req: Request, res: Response): Promise<Response> {
    const ReserveService = new ListReserveService();
    const reserves = await ReserveService.execute();

    return res.json(instanceToInstance(reserves));
  }

  // Show a reserve

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const ReserveService = new ShowReserveService();
    const reserve = await ReserveService.execute({ id: Number(id) });

    return res.json(instanceToInstance(reserve));
  }

  public async update(req: Request, res: Response): Promise<Response> {
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

    return res.json(instanceToInstance(reserve));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const ReserveService = new DeleteReserveService();
    await ReserveService.execute({ id: Number(id) });

    return res.status(204).send();
  }

}
