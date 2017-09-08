import express from 'express';
import validator from 'express-validator';
import bodyParser from 'body-parser';
import winston from 'winston';
import dotenv from 'dotenv';
import routes from './server/routes';

dotenv.config();


/** Set up the express app
 */
const app = express();

app.use(validator());

/** Parse incoming requests data (https://github.com/expressjs/body-parser)
 * @param  {} bodyParser.json(
 * @param  {false}} ;app.use
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Require our routes into the application.
 * @param  {} routes
 */
app.use(routes);

app.listen(process.env.PORT || 8000, () => { winston.info('server running'); });

export default app;
