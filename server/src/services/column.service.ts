import type { PayloadCreateColumn, PayloadUpdateColumn } from "../dto";
import { NotFoundError } from "../errors/http-errors";
import type { ColumnRepository } from "../repository";

export class ColumnService {
  constructor(private readonly columnRepository: ColumnRepository) {}

  public async create(payload: PayloadCreateColumn) {
    if (!(await this.columnRepository.boardExists(payload.boardId))) {
      throw new NotFoundError("Board");
    }

    return this.columnRepository.create(payload);
  }

  public async listByBoard(boardId: string) {
    if (!(await this.columnRepository.boardExists(boardId))) {
      throw new NotFoundError("Board");
    }

    return this.columnRepository.findByBoardId(boardId);
  }

  public async update(id: string, payload: PayloadUpdateColumn) {
    if (!(await this.columnRepository.findById(id))) {
      throw new NotFoundError("Column");
    }

    return this.columnRepository.update(id, payload);
  }

  public async remove(id: string) {
    if (!(await this.columnRepository.findById(id))) {
      throw new NotFoundError("Column");
    }

    await this.columnRepository.delete(id);
  }
}
