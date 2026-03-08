import multer from "multer";
import { AppError, ErrorCodes } from "../appError";
import path from "path";

const ALLOWED_MIME_TYPES = [
  "image/jpg",
  "image/png",
  "image/webp",
  "image/jpeg",
];

export const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/avatars",
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // .jpg
      const uniqueName = Date.now() + ext;
      cb(null, uniqueName);
    },
  }),
  dest: "uploads/avatars",
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(
        new AppError(
          "Можно загружать только изображения",
          ErrorCodes.INVALID_DATA,
        ),
      );
    }
    cb(null, true);
  },
});
