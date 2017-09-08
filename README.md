[![Build Status](https://travis-ci.org/Ruqoyah/More-Recipes.svg?branch=ft-server-code-%23150664257)](https://travis-ci.org/Ruqoyah/More-Recipes) [![Coverage Status](https://coveralls.io/repos/github/Ruqoyah/More-Recipes/badge.svg?branch=ft-update-server-code-150877782)](https://coveralls.io/github/Ruqoyah/More-Recipes?branch=ft-update-server-code-150877782)


# More-Recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a food recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

#### Installation
> - Git clone this repository
> - CD to the created directory
> - run npm install
> - run npm start to start server

#### API Routes
> - POST : /api/v1/users/signup API routes for users to create accounts 
> - POST : /api/v1/users/signin (username, password) An API route that allow users signin
> - GET : /api/v1/users An API route that get all users 
> - POST : /api/v1/recipes An API route that allow login user to add recipes
> - GET : /api/v1/recipes An API route that get all recipes
> - PUT : /api/v1/recipes/:recipeId An API route that allow login user modify recipes
> - DELETE : /api/v1/recipes/:recipeId An API route that allow login user to delete recipes
> - POST : /api/v1/recipes/:recipeId/reviews An API route that allow login user to post review on a recipes
> - GET : /api/v1/recipes/:recipeId/reviews An API route that get all reviews 
> - POST : /api/v1/users/:recipeId/recipes An API route that allow user add favorite recipes
> - GET : /api/v1/users/:userId/recipes An API route that get a user favorite recipes
> - POST : /api/v1/users/upvote/:recipeId An API route that allow user to upvote recipes
> - POST : /api/v1/users/downvote/:recipeId An API route that allow user to downvote recipes
> - GET : /api/v1/recipes?sort=upvotes&order=descending An API route that allow user get most upvote recipes

#### Author
Rukayat Odukoya