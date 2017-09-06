import express from 'express';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT || 8000, () => {
  console.log('server running');
});

module.exports = app;
