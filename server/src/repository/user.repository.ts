import { prisma } from '../db/connectDb';
import type { PayloadRegister, UserWithSecret } from '../dto';

export class UserRepository {
  constructor(private readonly database: typeof prisma = prisma) {}

  public async findById(id: string): Promise<UserWithSecret | null> {
    return await this.database.user.findUnique({
      where: { id },
      include: { secret: true },
    });
  }

  public async findByEmail(email: string): Promise<UserWithSecret | null> {
    return await this.database.user.findUnique({
      where: { email },
      include: { secret: true },
    });
  }

  public async setLastSignIn(id:string) {
    await this.database.user.update({ where: { id }, data: { secret: { update: { lastSignIn: new Date(Date.now())}}}})
  }

  public async create(payload: PayloadRegister): Promise<UserWithSecret> {
    return await this.database.user.create({
      data: {
        email: payload.email,
        name: payload.name,
        secret: {
          create: {
            password_hash: payload.password,
          },
        },
      },
      include:{ secret: true }
    });
  }
}