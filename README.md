[![Build Status](https://travis-ci.org/Ruqoyah/More-Recipes.svg?branch=feature%2F152323735%2Fimplement-upload-picture)](https://travis-ci.org/Ruqoyah/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/Ruqoyah/More-Recipes/badge.svg?branch=feature%2F152323735%2Fimplement-upload-picture)](https://coveralls.io/github/Ruqoyah/More-Recipes?branch=feature%2F152323735%2Fimplement-upload-picture)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)

# More-Recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a food recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

## Heroku link
https://more-recipes-app.herokuapp.com/


## Below are the API endpoints and their functions
EndPoint                               |   Functionality
---------------------------------------|------------------------
POST /api/v1/users/signup              |   Create a new users.
POST /api/v1/users/signin              |   Login users.            
GET /api/v1/users/:userId              |   Get user details.
PUT /api/v1/user/:userId               |   Edit profile.
POST /api/v1/users/userexist           |   Check if username exist.
POST /api/v1/users/emailexist          |   Check if email exist.
GET /api/v1/users                      |   Get all users (Applicable to admin).
POST /api/v1/recipes                   |   Add recipes
GET /api/v1/:userId/recipes            |   Get user recipes
GET /api/v1/recipes                    |   Get all recipes
PUT /api/v1/recipes/:recipeId          |   Modify recipes
GET /api/v1/recipes/:recipeId          |   View recipes
DELETE /api/v1/recipes/:recipeId       |   Delete recipes
POST /api/v1/recipes/:recipeId/reviews |   Post reviews
GET /api/v1/recipes/:recipeId/reviews  |   Get recipe reviews
POST /api/v1/users/:recipeId/recipes   |   Add favorite recipes
GET /api/v1/users/:userId/recipes      |   Get User favorite recipes
POST /api/v1/users/upvote/:recipeId    |   Upvote recipes
POST /api/v1/users/downvote/:recipeId  |   Downvote recipes


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
1.  Ensure you have NodeJs and postgres installed
2.  Clone the repository `https://github.com/Ruqoyah/More-Recipes.git`
3.  Change your directory `cd More-Recipes`
4.  Install all dependencies `npm install`
5.  Start the app `npm start` for development 
6.  Use [postman](https://www.getpostman.com/) to consume the API


## Tests
*  The tests have been written using Mocha framework and Chai assertion library
*  Run the test with `npm test`


## Limitation
- Users cannot deactivate their accounts


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

The API documentation can be viewed at <a href="http://more-recipes.getforge.io/" target="_blank">here</a>

## Author
-  Rukayat Odukoya

## License
This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details
