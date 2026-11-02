import { prisma } from "../db/connectDb";
import type { PayloadCreateCard, PayloadUpdateCard } from "../dto";

export class CardRepository {
  constructor(private readonly database: typeof prisma = prisma) {}

  public async columnExists(columnId: string): Promise<boolean> {
    const column = await this.database.column.findUnique({
      where: { id: columnId },
      select: { id: true },
    });

    return column !== null;
  }

  public async findById(id: string) {
    return this.database.card.findUnique({ where: { id } });
  }

  public async findByColumnId(columnId: string) {
    return this.database.card.findMany({
      where: { columnId },
      orderBy: { createdAt: "asc" },
    });
  }

  public async create(payload: PayloadCreateCard) {
    return this.database.card.create({
      data: {
        columnId: payload.columnId,
        title: payload.title,
        labelColor: payload.labelColor,
        ...(payload.description !== undefined && {
          description: payload.description,
        }),
        ...(payload.assigneeId !== undefined && {
          assigneeId: payload.assigneeId,
        }),
        ...(payload.dueDate !== undefined && { dueDate: payload.dueDate }),
      },
    });
  }

  public async update(id: string, payload: PayloadUpdateCard) {
    return this.database.card.update({
      where: { id },
      data: {
        ...(payload.columnId !== undefined && { columnId: payload.columnId }),
        ...(payload.title !== undefined && { title: payload.title }),
        ...(payload.description !== undefined && {
          description: payload.description,
        }),
        ...(payload.labelColor !== undefined && {
          labelColor: payload.labelColor,
        }),
        ...(payload.assigneeId !== undefined && {
          assigneeId: payload.assigneeId,
        }),
        ...(payload.dueDate !== undefined && { dueDate: payload.dueDate }),
      },
    });
  }

  public async delete(id: string) {
    return this.database.card.delete({ where: { id } });
  }
}