import type { PayloadCreateBoard, PayloadUpdateBoard } from "../dto";
import { NotFoundError } from "../errors/http-errors";
import type { BoardRepository } from "../repository";

export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  public async create(payload: PayloadCreateBoard) {
    if (!(await this.boardRepository.ownerExists(payload.ownerId))) {
      throw new NotFoundError("Board owner");
    }

    return this.boardRepository.create(payload);
  }

  public async listByOwner(ownerId: string) {
    if (!(await this.boardRepository.ownerExists(ownerId))) {
      throw new NotFoundError("Board owner");
    }

    return this.boardRepository.findByOwnerId(ownerId);
  }

  public async getById(id: string) {
    const board = await this.boardRepository.findById(id);
    if (!board) {
      throw new NotFoundError("Board");
    }

    return board;
  }

  public async update(id: string, payload: PayloadUpdateBoard) {
    if (!(await this.boardRepository.findById(id))) {
      throw new NotFoundError("Board");
    }

    return this.boardRepository.update(id, payload);
  }

  public async remove(id: string) {
    if (!(await this.boardRepository.findById(id))) {
      throw new NotFoundError("Board");
    }

    await this.boardRepository.delete(id);
  }
}
