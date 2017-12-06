[![Build Status](https://travis-ci.org/Ruqoyah/More-Recipes.svg?branch=feature%2F152323735%2Fimplement-upload-picture)](https://travis-ci.org/Ruqoyah/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/Ruqoyah/More-Recipes/badge.svg?branch=feature%2F152323735%2Fimplement-upload-picture)](https://coveralls.io/github/Ruqoyah/More-Recipes?branch=feature%2F152323735%2Fimplement-upload-picture)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)

# More-Recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a food recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

## Hosted Application
https://more-recipes-app.herokuapp.com/

## API Documentation
The API documentation can be viewed at <a href="http://more-recipes.getforge.io/" target="_blank">here</a>


## Technologies Used
* [NodeJS:](https://nodejs.org/en/) is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
* [Javascript ES6:](https://en.wikipedia.org/wiki/ECMAScript) ES6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, spread opeartor, etc.
* [React:](https://facebook.github.io/react/tutorial/tutorial.html) Facebook open source, efficient, javascript library for building front-end projects.
* [PostgreSQL:](https://www.postgresql.org/) PostgreSQL is a powerful, open source object-relational database system (ORDBMS) that offers modern database features such as complex queries, foreign keys, etc.
* [Sequelize:](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js that supports different dialects such PostgreSQL, MySQL, and SQLite.
* [Babel:](https://babeljs.io/)  Babel transpiles es6 codes to es5.
* [Webpack:](https://webpack.github.io/docs/what-is-webpack.html) Webpack is used to bundle modules and does tasks automation.
* [Axios:](https://www.npmjs.com/package/axios) Axios is an http client library used in consuming API.


## Installation
1.  Git clone this repository `https://github.com/Ruqoyah/More-Recipes.git`
2.  Change your directory `cd More-Recipes`
3.  Install all dependencies `npm install`
4.  Create .env file which will be used to load environment variables see sample in `.env.example` file in the project
5.  Create a database to be used with application
6.  Migrate `sequelize db:migrate`
7.  Start the app `npm start` for development 
8.  Navigate to `localhost:8000`


## Tests
*  The tests have been written using Mocha framework and Chai assertion library
*  Run the test with `npm test`


## Limitations
- Users cannot deactivate their accounts
- Users can only create account once with their username and email
- Users can login and obtain a token which is verified on every request
- Users will have to obtain a fresh token after 24 hours when their session has expired
- Users will only be able to access the full application functionalities only if they are logged in


## Coding Style
- Airbnb: Airbnb is a coding style guide that guides developers to write clean codes


## How to Contribute
- Fork this repository.
- Clone it.
- Create your feature branch on your local machine with ```git checkout -b your-feature-branch```
- Push your changes to your remote branch with ```git push origin your-feature-branch```
- Open a pull request to the master branch, and describe how your feature works
- Refer to this wiki for proper <a href="https://github.com/Ruqoyah/More-Recipes/wiki">GIT CONVENTION</a>

Ensure your codes follow <a href="https://github.com/airbnb/javascript">AirBnB Javascript Styles Guide</a>


## Author
-  Rukayat Odukoya

## License
This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details
