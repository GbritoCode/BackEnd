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

export const oportunidadeFile = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads', 'oportunidades'),
    filename: (req, file, cb) => {
      const { query } = req;
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        const date = new Date().toLocaleString('pt-br').replace(/\//g, '-').slice(0, 10);
        return cb(null,
          `${res.toString('hex')}_${Math.round(Math.random() * 1E9)}${extname(file.originalname)}`);
      });
    },
  }),
};
