import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import winston from 'winston';
import cors from 'cors';
import webpackMiddleware from 'webpack-dev-middleware';
import validator from 'express-validator';
import webpackConfig from './webpack.config';
import routes from './server/routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./client/public/')); // configure static files folder
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(routes);
app.use(cors());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(port, () => {
  winston.info(`Connected on port: ${port}`);
});
export default app;

