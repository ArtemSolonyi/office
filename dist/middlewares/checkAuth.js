import jwt from "jsonwebtoken";
export class AuthMiddlewares {
    static async checkAuth(req, res, next) {
        try {
            const accessToken = req.headers.authorization;
            if (req.headers.authorization) {
                const verifiedToken = await jwt.verify(accessToken, process.env.SECRET_KEY_ACCESS_JWT);
                req.body.userId = verifiedToken.userId;
                next();
            }
        }
        catch (e) {
            return res.status(401).json({ "message": e });
        }
    }
}
//# sourceMappingURL=checkAuth.js.map