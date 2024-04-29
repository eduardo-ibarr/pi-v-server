import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";

export function handleErrors(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error(error);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  } else {
    return response.status(500).json({ message: "Erro interno do servidor." });
  }
}
