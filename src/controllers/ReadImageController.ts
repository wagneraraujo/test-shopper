import { Request, Response, NextFunction } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { StatusCodes } from "http-status-codes";
import { convertToBase64 } from "../utils/imageFiles";
import fs from "fs";

const ReadImageController = {
  async ReadImage(req: Request, res: Response) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY não está definida");
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });

    const image = req?.file;
    if (!image) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Arquivo obrigatório",
      });
    }
    const prompt = "Describe this image";

    try {
      const base64String = await convertToBase64(
        req.file as Express.Multer.File,
      );
      if (image) {
        const generatedContent = await model.generateContent([
          prompt,
          ...base64String,
        ]);

        res.status(StatusCodes.OK).json(generatedContent);
      }
    } catch (err) {
      console.log("other error", err);
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Algo deu errado",
      });
    }
  },
};

export default ReadImageController;
