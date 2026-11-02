import type { Request, Response } from "express";
import type { ColumnService } from "../services/column.service";

export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  public create = async (req: Request, res: Response) => {
    const column = await this.columnService.create(req.body);

    res.status(201).json(column);
  };

  public listByBoard = async (req: Request, res: Response) => {
    const columns = await this.columnService.listByBoard(
      req.params.boardId as string,
    );

    res.status(200).json(columns);
  };

  public update = async (req: Request, res: Response) => {
    const column = await this.columnService.update(
      req.params.id as string,
      req.body,
    );

    res.status(200).json(column);
  };

  public remove = async (req: Request, res: Response) => {
    await this.columnService.remove(req.params.id as string);
    res.status(204).send();
  };
}
