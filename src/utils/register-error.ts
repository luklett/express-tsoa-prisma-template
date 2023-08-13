import dayjs from 'dayjs';
import fs, { mkdirSync } from 'fs';
import path from 'path';
import Exception from '../config/exception';

export const registerError = (error: Error | Exception): void => {
  try {
    const destination = path.resolve(__dirname, '../../logs');
    const dir = `${destination}/${dayjs().format('YYYY-MM-DD')}.txt`;

    mkdirSync(destination, { recursive: true });

    fs.appendFileSync(dir, `[${dayjs().format('HH:mm')}]: ${error.stack}\n`);
  } catch (e) {
    console.log(e);
  }
};
