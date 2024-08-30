import multer from "multer";
import path from "path";

export const MAX_UP_FILE = 1024 * 1024 * 10; // 10MB
export const ACCEPTED_FILE_EXTENSIONS = ["png", "jpg", "jpeg", "pdf"];
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
    cb(null, true);
  },
});

export default imageUploud;
