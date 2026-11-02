import type { Request, Response } from "express";
import type { BoardService } from "../services/board.service";

export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  public create = async (req: Request, res: Response) => {
    const board = await this.boardService.create(req.body);

    res.status(201).json(board);
  };

  public listByOwner = async (req: Request, res: Response) => {
    const boards = await this.boardService.listByOwner(
      req.params.ownerId as string,
    );

    res.status(200).json(boards);
  };

  public getById = async (req: Request, res: Response) => {
    const board = await this.boardService.getById(req.params.id as string);

    res.status(200).json(board);
  };

  public update = async (req: Request, res: Response) => {
    const board = await this.boardService.update(
      req.params.id as string,
      req.body,
    );

    res.status(200).json(board);
  };

  public remove = async (req: Request, res: Response) => {
    await this.boardService.remove(req.params.id as string);
    res.status(204).send();
  };
}