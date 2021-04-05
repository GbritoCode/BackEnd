import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export const avatar = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads', 'avatars'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};

export const oportunidadeCotacao = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads', 'oportunidades'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        console.log(file);
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
