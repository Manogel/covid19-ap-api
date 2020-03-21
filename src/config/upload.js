import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (error, resp) => {
        if (error) return cb(error);
        return cb(null, resp.toString(`hex`) + extname(file.originalname));
      });
    },
  }),
};
