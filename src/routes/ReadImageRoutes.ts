import { Router } from "express";
import ReadImageController from "../controllers/ReadImageController";

const routerReadImage = Router();

//routes
routerReadImage.post("/sendimage", ReadImageController.ReadImage);

export { routerReadImage };
