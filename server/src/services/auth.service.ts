import jwt  from 'jsonwebtoken';
import type { PayloadLogin, PayloadRegister } from "../dto";
import { hash, compare } from "bcrypt"
import type { UserRepository } from "../repository";
import { UnauthorizedError } from "../errors/http-errors";

export class AuthService {
  constructor(private userRespo: UserRepository) {}

  generateToken(payload: { id:string, email:string }, type: "access" | "refresh") {
    const Secret =
      type === "access"
        ? process.env.JWT_SECRET
        : process.env.REFRESH_SECRET_JWT;
    return jwt.sign(payload, Secret!, {
      expiresIn: type === "access" ? "15m" : "7d",
    });
  }

  decodeToken(token: string, type: "access" | "refresh") {
    const Secret =
      type === "access"
        ? process.env.JWT_SECRET
        : process.env.REFRESH_SECRET_JWT;
    return jwt.verify(token, Secret!) as unknown as  { id: string; email: string };
  }

  generatePaireToken(payload: { id:string, email:string }) {
    const accessToken = this.generateToken(payload, "access");
    const refreshToken = this.generateToken(payload, "refresh");
    return { accessToken, refreshToken };
  }

  async validateToken(id: string, token: string) {
    const user = await this.userRespo.findById(id);
    if (!user?.secret || !user.secret.token) return false;
    else return await compare(token, user.secret.token!);
  }

  async setRefreshToken(id: string, token: string| null ) {
    return await this.userRespo.setResfreshToken(id, token);
  }

  async findOne(id: string) {
    return await await this.userRespo.findById(id);
  }

  public async authentication(payload: PayloadLogin) {
    const user = await this.userRespo.findByEmail(payload.email);
    if (
      !user ||
      !user.secret ||
      !(await compare(payload.password, user.secret.password_hash))
    ) {
      throw new UnauthorizedError("Invalid credentials");
    }

    await this.userRespo.setLastSignIn(user.id);
    return user;
  }

  public async register(payload: PayloadRegister) {
    const salt = 10;

    const finalPayload: PayloadRegister = {
      ...payload,
      password: await hash(payload.password, salt),
    };

    let user = await this.userRespo.create(finalPayload);

    return await this.authentication({
      email: payload.email,
      password: payload.password,
    });
  }
}