import type { Request, Response } from "express";
import type { CardService } from "../services/card.service";

export class CardController {
  constructor(private readonly cardService: CardService) {}

  public create = async (req: Request, res: Response) => {
    const card = await this.cardService.create(req.body);

    res.status(201).json(card);
  };

  public listByColumn = async (req: Request, res: Response) => {
    const cards = await this.cardService.listByColumn(
      req.params.columnId as string,
    );

    res.status(200).json(cards);
  };

  public update = async (req: Request, res: Response) => {
    const card = await this.cardService.update(
      req.params.id as string,
      req.body,
    );

    res.status(200).json(card);
  };

  public remove = async (req: Request, res: Response) => {
    await this.cardService.remove(req.params.id as string);
    res.status(204).send();
  };
}
