import { prisma } from "../db/connectDb";
import type { PayloadCreateColumn, PayloadUpdateColumn } from "../dto";

export class ColumnRepository {
  constructor(private readonly database: typeof prisma = prisma) {}

  public async boardExists(boardId: string): Promise<boolean> {
    const board = await this.database.board.findUnique({
      where: { id: boardId },
      select: { id: true },
    });

    return board !== null;
  }

  public async findById(id: string) {
    return this.database.column.findUnique({ where: { id } });
  }

  public async findByBoardId(boardId: string) {
    return this.database.column.findMany({
      where: { boardId },
      orderBy: { createdAt: "asc" },
    });
  }

  public async create(payload: PayloadCreateColumn) {
    return this.database.column.create({ data: payload });
  }

  public async update(id: string, payload: PayloadUpdateColumn) {
    return this.database.column.update({
      where: { id },
      data: payload,
    });
  }

  public async delete(id: string) {
    return this.database.column.delete({ where: { id } });
  }
}