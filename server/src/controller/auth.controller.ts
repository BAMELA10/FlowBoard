import { hash } from "bcrypt";
import type { PayloadLogin, PayloadRegister, UserWithSecret } from "../dto";
import { BadRequestError, UnauthorizedError } from "../errors/http-errors";
import type { AuthService } from "../services/auth.service";
import type { Request, Response } from "express";


export class AuthController {
    constructor(private authService: AuthService) {}
    private handleAuthenticationResponse = async (data: UserWithSecret, req: Request, res: Response) => {
        const { accessToken, refreshToken } =
        await this.authService.generatePaireToken({
            id: data.id,
            email: data.email,
        });
        const hashRefreshToken = await hash(refreshToken, 10)
        
        await this.authService.setRefreshToken(data.id, hashRefreshToken);
        
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: "/auth", // le cookie n'est envoyé qu'aux routes /auth
        });
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
          path: "/auth", // le cookie n'est envoyé qu'aux routes /auth
        });
        res.status(200).json({ accessToken, user: data });
    }

    public login = async ( req: Request, res: Response) => {
        try {
            const payload: PayloadLogin = req.body;
            const user = await this.authService.authentication(payload);
            this.handleAuthenticationResponse(user, req, res);
        } catch(e) {
            throw new BadRequestError((e as Error).message);
        }
    }

    public register = async ( req: Request, res: Response) => {
        const payload: PayloadRegister = req.body;
        const user = await this.authService.register(payload);
        this.handleAuthenticationResponse(user, req, res);
    }

    public refresh = async ( req: Request, res: Response) => {
        //check if Refresh Token is valid
        const refresToken = req?.cookies?.['refreshToken'];
        if (!refresToken) throw new UnauthorizedError("EmptyRefreshToken");
        const payload = this.authService.decodeToken(refresToken, "refresh")
        console.log(payload);
        const isValid = await this.authService.validateToken(payload.id,refresToken);
        if (!isValid) throw new UnauthorizedError("Invalid Token");
        const user = await this.authService.findOne(payload.id);
        this.handleAuthenticationResponse(user!, req, res);
    }

    public logout = async ( req: Request, res: Response) => {
        const refresToken = req?.cookies?.["refreshToken"];
        if (!refresToken) throw new UnauthorizedError("EmptyRefreshToken");
        const payload = this.authService.decodeToken(refresToken, "refresh");
        await this.authService.setRefreshToken(payload.id, null);

        res.clearCookie("refreshToken");
        res.clearCookie("accessToken");

        res.status(200).json({ message: "logout ok"})
    }
}