import { prisma } from '../db/connectDb';
import type { PayloadRegister, UserWithSecret } from '../dto';
import { ConflictError, InternalServerError } from '../errors/http-errors';
import { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace';

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

  public async setResfreshToken(id:string, token:string| null ) {
    await this.database.user.update({ where: { id }, data: { secret: { update: { token }}}})
  }

  public async create(payload: PayloadRegister): Promise<UserWithSecret> {
    try { 
      const user = await this.database.user.create({
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
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError &&
        e.code === 'P2002') throw new ConflictError(
          "UserWithEmailAlreadyExists"
        );
      else throw new InternalServerError("Something went wrong!");
    }
    
  }
}