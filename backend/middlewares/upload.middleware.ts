import multer from "multer";
import { AppError, ErrorCodes } from "../appError";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const upload = multer({
  dest: "uploads/avatars",
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(
        new AppError("Можно загружать только изображения", ErrorCodes.INVALID_DATA)
      );
    }
    cb(null, true);
  },
});

