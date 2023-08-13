import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';
import fs, { mkdirSync } from 'fs';
import ip from 'ip';
import path from 'path';

export const logMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const destination = path.resolve(__dirname, '../../logs');
  const dir = `${destination}/${dayjs().format('YYYY-MM-DD')}.txt`;

  mkdirSync(destination, { recursive: true });

  fs.appendFileSync(
    dir,
    `[${dayjs().format('HH:mm')}]: Se ingreso en la página ${req.url} desde la IP ${ip.address()}\n`
  );

  next();
};
