import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error";

export function handleErrors(
  request: Request,
  response: Response,
  next: NextFunction,
  error?: AppError
) {
  if (error) {
    console.error(error);
    return response.status(error.statusCode).json({ error: error.message });
  } else {
    return response.status(500).json({ error: "Erro interno do servidor." });
  }
}
