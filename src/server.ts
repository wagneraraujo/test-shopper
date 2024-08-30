import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { routerReadImage } from "./routes/ReadImageRoutes";
import imageUploud from "./utils/imageFiles";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("./public/"));

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static("public"));
app.use(bodyParser.json());
//routes
app.get("/", (req: any, res: any) => {
  res.send("Olá, este é o meu servidor Express!\n");
});

//read image routes
app.use("/read", imageUploud.single("image"), routerReadImage);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
