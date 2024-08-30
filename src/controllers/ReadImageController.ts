import { Request, Response, NextFunction } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

const ReadImageController = {
  async ReadImage(req: Request, res: Response) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY não está definida");
    }
    const genAI = new GoogleGenerativeAI(apiKey);

    const image = req?.file;
    if (!image) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Arquivo obrigatório",
      });
    }
    try {
      console.log("imagem ====>", image);
      res.status(StatusCodes.OK).json(image);
    } catch (err) {
      console.log("other error", err);
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Algo deu errado",
      });
    }
  },
};

export default ReadImageController;
