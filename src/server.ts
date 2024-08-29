import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static("public"));
app.use(bodyParser.json());

//routes
app.get("/", (req: any, res: any) => {
  res.send("Olá, este é o meu servidor Express!\n");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/`);
});
