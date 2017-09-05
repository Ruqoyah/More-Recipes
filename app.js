import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import routes from './server/routes';


// Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
app.use(routes);

app.listen(process.env.PORT || 8000, () => {
  winston.info('server running');
});

export default app;
