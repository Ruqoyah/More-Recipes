[![Build Status](https://travis-ci.org/Ruqoyah/More-Recipes.svg?branch=feature%2F152323735%2Fimplement-upload-picture)](https://travis-ci.org/Ruqoyah/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/Ruqoyah/More-Recipes/badge.svg?branch=feature%2F152323735%2Fimplement-upload-picture)](https://coveralls.io/github/Ruqoyah/More-Recipes?branch=feature%2F152323735%2Fimplement-upload-picture)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)


# More-Recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a food recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

## Heroku link
https://more-recipes-app.herokuapp.com/

## Installation
> - Git clone this repository : https://github.com/Ruqoyah/More-Recipes.git
> - CD to the created directory
> - run npm install
> - run npm start to start server

## Dependencies
> - babel-cli    - babel-core    - babel-preset-es2015   - babel-preset-stage-2
> - bcrypt   - body-parser    - chai   - coveralls    - dotenv  - expect
> - express  - express-validator  - jsonwebtoken   - mocha   - mocha-lcov-reporter
> - morgan   - nyc    - pg   - pg-hstore  - sequelize   - sequelize-cli   - supertest

## API Routes
> - POST : /api/v1/users/signup API routes for users to create accounts 
> - POST : /api/v1/users/signin (username, password) An API route that allow users signin
> - GET : /api/v1/users An API route that get all users 
> - POST : /api/v1/recipes An API route that allow login user to add recipes
> - GET : /api/v1/recipes An API route that get all recipes
> - GET : /api/v1/recipes/:recipeId An API route that allow user to view recipe 
> - PUT : /api/v1/recipes/:recipeId An API route that allow login user modify recipes
> - DELETE : /api/v1/recipes/:recipeId An API route that allow login user to delete recipes
> - POST : /api/v1/recipes/:recipeId/reviews An API route that allow login user to post review on a recipes
> - GET : /api/v1/recipes/:recipeId/reviews An API route that get all reviews 
> - POST : /api/v1/users/:recipeId/recipes An API route that allow user add favorite recipes
> - PUT : /api/v1/users/:recipeId/recipes An API route that allow user to add favorite recipe to a category
> - GET : /api/v1/users/:userId/recipes An API route that get a user favorite recipes
> - POST : /api/v1/users/upvote/:recipeId An API route that allow user to upvote recipes
> - POST : /api/v1/users/downvote/:recipeId An API route that allow user to downvote recipes
> - GET : /api/v1/recipes?sort=upvotes&order=descending An API route that allow user get most upvote recipes
> - GET : /api/v1/recipes?search=:keyword An API route that allow user search recipe

## Author
-  Rukayat Odukoya

## License
This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details
