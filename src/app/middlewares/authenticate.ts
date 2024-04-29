import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-error";
import { JWTProvider } from "../../providers/auth/jwt-provider";

interface DecodedToken {
  email: string;
  role: string;
}

const authProvider = new JWTProvider();

interface CustomRequest extends Request {
  user: {
    email: string;
    role: string;
  };
}

const blacklist: string[] = [];

async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.header("Authorization");

  if (!token) {
    throw new AppError("Token não fornecido.", 401);
  }

  const index = blacklist.findIndex((item: any) => item === token);

  if (index !== -1) {
    throw new AppError("Acesso não autorizado.", 401);
  }

  try {
    const decoded = <DecodedToken>await authProvider.decode(token);

    if (!decoded) {
      throw new AppError("Token inválido", 401);
    }

    const { email, role } = decoded;

    (request as CustomRequest).user = {
      email,
      role,
    };

    next();
  } catch (error) {
    throw new AppError("Token inválido", 401);
  }
}

export default authMiddleware;
