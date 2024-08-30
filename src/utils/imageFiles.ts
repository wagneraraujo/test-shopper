import multer from "multer";
import path from "path";
import fs from "fs/promises";
const MAX_UP_FILE = 1024 * 1024 * 10; // 10MB
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.originalname),
    );
  },
});
const imageUploud = multer({
  storage: imageStorage,

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|JPG|PNG|jpeg|JPEG|PDF)$/)) {
      return cb(new Error("Apenas imagens png ou jpg"));
    }
    if (file.size > MAX_UP_FILE) {
      return cb(new Error("Tamanho maximo 10MB"));
    }
    cb(null, true);
  },
});

export async function convertToBase64(
  file: Express.Multer.File,
): Promise<string> {
  const buffer = await fs.readFile(file.path);
  return Buffer.from(buffer).toString("base64");
}

export default imageUploud;
