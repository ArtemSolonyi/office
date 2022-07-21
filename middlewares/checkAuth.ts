import {Request, Response, NextFunction} from "express";
import jwt, {Jwt, JwtPayload} from "jsonwebtoken";



interface JwtPayLoads {
    userId: string;
}

export class AuthMiddlewares {
    static async checkAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken = req.headers.authorization
            if (req.headers.authorization) {
                const verifiedToken = await jwt.verify(accessToken!, process.env.SECRET_KEY_ACCESS_JWT!) as Jwt & JwtPayLoads & void
                req.body.userId = verifiedToken.userId
                next()
            }
        } catch (e) {
            return res.status(401).json({"message": e})
        }

    }
}
