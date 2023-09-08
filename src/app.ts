import http from 'http';
import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import morgan from 'morgan';
import swaggerJson from './swagger.json';
import { RegisterRoutes } from './routes';
import { errorHandlerMiddleware } from './middlewares/error-handler';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

RegisterRoutes(app);

app.use(errorHandlerMiddleware);

app.use('/public', express.static('public'));
app.use('/assets', express.static('assets'));

const server = http.createServer(app);

export default server;
