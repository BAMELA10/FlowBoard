import type { PayloadCreateCard, PayloadUpdateCard } from "../dto";
import { NotFoundError } from "../errors/http-errors";
import type { CardRepository } from "../repository";

export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  public async create(payload: PayloadCreateCard) {
    if (!(await this.cardRepository.columnExists(payload.columnId))) {
      throw new NotFoundError("Column");
    }

    return this.cardRepository.create(payload);
  }

  public async listByColumn(columnId: string) {
    if (!(await this.cardRepository.columnExists(columnId))) {
      throw new NotFoundError("Column");
    }

    return this.cardRepository.findByColumnId(columnId);
  }

  public async update(id: string, payload: PayloadUpdateCard) {
    if (!(await this.cardRepository.findById(id))) {
      throw new NotFoundError("Card");
    }

    if (
      payload.columnId &&
      !(await this.cardRepository.columnExists(payload.columnId))
    ) {
      throw new NotFoundError("Column");
    }

    return this.cardRepository.update(id, payload);
  }

  public async remove(id: string) {
    if (!(await this.cardRepository.findById(id))) {
      throw new NotFoundError("Card");
    }

    await this.cardRepository.delete(id);
  }
}
