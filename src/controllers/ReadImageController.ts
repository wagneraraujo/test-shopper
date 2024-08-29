import { Request, Response, NextFunction } from "express";

const ReadImageController = {
  async ReadImage(req: Request, res: Response) {
    const image = req.file;
    console.log("request imgem");
    res.status(200).json(image);
  },
};

export default ReadImageController;
