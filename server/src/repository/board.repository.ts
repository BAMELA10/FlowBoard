import { prisma } from "../db/connectDb";
import type { PayloadCreateBoard, PayloadUpdateBoard } from "../dto";

export class BoardRepository {
  constructor(private readonly database: typeof prisma = prisma) {}

  public async ownerExists(ownerId: string): Promise<boolean> {
    const owner = await this.database.user.findUnique({
      where: { id: ownerId },
      select: { id: true },
    });

    return owner !== null;
  }

  public async findById(id: string) {
    return this.database.board.findUnique({
      where: { id },
      include: {
        column: {
          orderBy: { createdAt: "asc" },
          include: {
            card: {
              orderBy: { createdAt: "asc" },
            },
          },
        },
      },
    });
  }

  public async findByOwnerId(ownerId: string) {
    return this.database.board.findMany({
      where: { ownerId },
      orderBy: { createdAt: "asc" },
    });
  }

  public async create(payload: PayloadCreateBoard) {
    return this.database.board.create({
      data: payload,
    });
  }

  public async update(id: string, payload: PayloadUpdateBoard) {
    return this.database.board.update({
      where: { id },
      data: payload,
    });
  }

  public async delete(id: string) {
    return this.database.board.delete({
      where: { id },
    });
  }
}