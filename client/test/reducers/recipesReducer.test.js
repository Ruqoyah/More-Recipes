import expect from 'expect';
import recipesReducer from '../../reducers/recipesReducer';
import mockData from '../_mocks_/mockData';
import {
  GET_USER_RECIPES,
  GET_RECIPES,
  SEARCH_RECIPES,
  GET_FAVORITE_RECIPES,
  ADD_REVIEW,
  VIEW_RECIPE,
  GET_REVIEW,
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
  SAVE_RECIPE_IMAGE,
  LOAD_MORE_REVIEWS
} from '../../actions/types';

describe('Recipes Reducer', () => {
  it('should get user recipes when passed with GET_USER_RECIPES', () => {
    const { recipeDetails } = mockData;
    const initialState = {
      userRecipes: []
    };
    const userRecipes = {
      pages: 1,
      status: true,
      recipes: {
        count: 2,
        rows: recipeDetails
      }
    };
    const action = {
      type: GET_USER_RECIPES,
      payload: userRecipes,
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.userRecipes[0].recipeName).toEqual('Asdf');
    expect(newState.userRecipes[0].ingredient).toEqual('dsfg');
    expect(newState.userRecipes[0].details).toEqual('dsf');
    expect(newState.userRecipes[0].picture).toEqual('tw2y57mjg7pbdo4dyrci');
    expect(newState.userRecipes[0].userId).toEqual(1);
    expect(newState.userRecipes[0].id).toEqual(8);
    expect(newState.userRecipes[0].upvotes).toEqual(0);
    expect(newState.userRecipes[0].downvotes).toEqual(0);
    expect(newState.userRecipes[0].views).toEqual(0);
  });

  it('should edit profile when passed with EDIT_RECIPE', () => {
    const { recipeDetails } = mockData;
    const initialState = {
      userRecipes: recipeDetails
    };
    const userRecipes = {
      id: 8,
      recipeName: "Yam",
      ingredient: "yam and water",
      details: "cook it well",
      picture: "tw2y57mjg7pbdo4dyrci",
      userId: 1,
      upvotes: 0,
      downvotes: 0,
      views: 0,
      createdAt: "2018-01-10T01:36:04.250Z",
      updatedAt: "2018-01-10T01:36:04.250Z"
    };
    const action = {
      type: EDIT_RECIPE,
      payload: userRecipes,
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.userRecipes[0].recipeName).toEqual('Yam');
    expect(newState.userRecipes[0].ingredient).toEqual('yam and water');
    expect(newState.userRecipes[0].details).toEqual('cook it well');
  });

  it('should delete profile when passed with DELETE_RECIPE', () => {
    const { recipeDetails } = mockData;
    const initialState = {
      userRecipes: recipeDetails
    };
    const userRecipes = 8;

    const action = {
      type: DELETE_RECIPE,
      id: userRecipes,
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.userRecipes.length).toEqual(1);
  });

  it('should get recipes when passed with GET_RECIPES', () => {
    const { recipeDetails } = mockData;
    const initialState = {
      recipes: []
    };
    const recipes = {
      pages: 1,
      status: true,
      recipes: {
        count: 2,
        rows: recipeDetails
      }
    };
    const action = {
      type: GET_RECIPES,
      payload: recipes,
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.recipes[0].recipeName).toEqual('Asdf');
    expect(newState.recipes[0].ingredient).toEqual('dsfg');
    expect(newState.recipes[0].details).toEqual('dsf');
    expect(newState.recipes[0].picture).toEqual('tw2y57mjg7pbdo4dyrci');
    expect(newState.recipes[0].userId).toEqual(1);
    expect(newState.recipes[0].id).toEqual(8);
    expect(newState.recipes[0].upvotes).toEqual(0);
    expect(newState.recipes[0].downvotes).toEqual(0);
    expect(newState.recipes[0].views).toEqual(0);
  });

  it('should search recipe when passed with SEARCH_RECIPES', () => {
    const { recipeDetails } = mockData;
    const initialState = {
      recipes: [
        recipeDetails
      ]
    };
    const recipes = {
      data: {
        id: 8,
        recipeName: "Yam",
        ingredient: "yam and water",
        details: "cook it well",
        picture: "tw2y57mjg7pbdo4dyrci",
        userId: 1,
        upvotes: 0,
        downvotes: 0,
        views: 0,
        createdAt: "2018-01-10T01:36:04.250Z",
        updatedAt: "2018-01-10T01:36:04.250Z"
      }
    };
    const action = {
      type: SEARCH_RECIPES,
      payload: recipes,
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.recipes.recipeName).toEqual('Yam');
    expect(newState.recipes.ingredient).toEqual('yam and water');
    expect(newState.recipes.details).toEqual('cook it well');
    expect(newState.recipes.picture).toEqual('tw2y57mjg7pbdo4dyrci');
    expect(newState.recipes.userId).toEqual(1);
    expect(newState.recipes.id).toEqual(8);
    expect(newState.recipes.upvotes).toEqual(0);
    expect(newState.recipes.downvotes).toEqual(0);
    expect(newState.recipes.views).toEqual(0);
  });

  it('should get recipes when passed with GET_FAVORITE_RECIPES', () => {
    const { recipeDetails } = mockData;
    const initialState = {
      favoriteRecipes: []
    };
    const favoriteRecipes = {
      pages: 1,
      status: true,
      favoriteRecipes: {
        count: 2,
        rows: recipeDetails
      }
    };
    const action = {
      type: GET_FAVORITE_RECIPES,
      payload: favoriteRecipes,
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.favoriteRecipes[0].recipeName).toEqual('Asdf');
    expect(newState.favoriteRecipes[0].ingredient).toEqual('dsfg');
    expect(newState.favoriteRecipes[0].details).toEqual('dsf');
    expect(newState.favoriteRecipes[0].picture).toEqual('tw2y57mjg7pbdo4dyrci');
    expect(newState.favoriteRecipes[0].userId).toEqual(1);
    expect(newState.favoriteRecipes[0].id).toEqual(8);
    expect(newState.favoriteRecipes[0].upvotes).toEqual(0);
    expect(newState.favoriteRecipes[0].downvotes).toEqual(0);
    expect(newState.favoriteRecipes[0].views).toEqual(0);
  });

  it('should view recipe when passed with VIEW_RECIPE', () => {
    const initialState = {
      viewRecipe: {}
    };
    const viewRecipe = {
      id: 8,
      recipeName: "Yam",
      ingredient: "yam and water",
      details: "cook it well",
      picture: "tw2y57mjg7pbdo4dyrci",
      userId: 1,
      upvotes: 0,
      downvotes: 0,
      views: 0,
      createdAt: "2018-01-10T01:36:04.250Z",
      updatedAt: "2018-01-10T01:36:04.250Z"
    };
    const action = {
      type: VIEW_RECIPE,
      payload: viewRecipe,
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.viewRecipe.recipeName).toEqual('Yam');
    expect(newState.viewRecipe.ingredient).toEqual('yam and water');
    expect(newState.viewRecipe.details).toEqual('cook it well');
    expect(newState.viewRecipe.picture).toEqual('tw2y57mjg7pbdo4dyrci');
    expect(newState.viewRecipe.userId).toEqual(1);
    expect(newState.viewRecipe.id).toEqual(8);
    expect(newState.viewRecipe.upvotes).toEqual(0);
    expect(newState.viewRecipe.downvotes).toEqual(0);
    expect(newState.viewRecipe.views).toEqual(0);
  });

  it('should get reviews when passed with GET_REVIEW', () => {
    const { reviewRecipe } = mockData;
    const initialState = {
      reviews: []
    };
    const reviews = {
      pages: 1,
      status: true,
      reviews: {
        count: 1,
        rows: reviewRecipe
      }
    };
    const action = {
      type: GET_REVIEW,
      payload: reviews,
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.reviews[0].userId).toEqual(1);
    expect(newState.reviews[0].id).toEqual(1);
    expect(newState.reviews[0].recipeId).toEqual(8);
    expect(newState.reviews[0].review).toEqual('nice');
  });

  it('should save recipe image when passed with SAVE_RECIPE_IMAGE', () => {
    const initialState = {
      imageDetails: ''
    };
    const imageDetails = 'k8sppk4v3048madldvyw';

    const action = {
      type: SAVE_RECIPE_IMAGE,
      payload: imageDetails,
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.imageDetails).toEqual('k8sppk4v3048madldvyw');
  });

  it('should return recipes initial state for invalid action type', () => {
    const { recipeDetails } = mockData;
    const initialState = {
      recipes: []
    };
    const recipes = {
      pages: 1,
      status: true,
      recipes: {
        count: 2,
        rows: recipeDetails
      }
    };
    const action = {
      type: 'TEST',
      payload: recipes
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.recipes).toEqual([]);
  });

  it('should get reviews when passed with LOAD_MORE_REVIEWS', () => {
    const { reviewRecipe } = mockData;
    const initialState = {
      reviews: reviewRecipe
    };
    const reviews = {
      pages: 1,
      status: true,
      reviews: {
        count: 1,
        rows: reviewRecipe
      }
    };
    const action = {
      type: LOAD_MORE_REVIEWS,
      payload: reviews,
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.reviews[0].userId).toEqual(1);
    expect(newState.reviews[0].id).toEqual(1);
    expect(newState.reviews[0].recipeId).toEqual(8);
    expect(newState.reviews[0].review).toEqual('nice');
  });

  it('should add reviw when passed with ADD_REVIEW', () => {
    const { reviewRecipe } = mockData;
    const initialState = {
      reviews: reviewRecipe
    };
    const reviews = {
      status: true,
      data: {
        User: {
          picture: "tw2y57mjg7pbdo4dyrci",
          username: "rukkiey"
        },
        id: 1,
        recipeId: 8,
        userId: 1,
        review: 'great recipe',
        createdAt: "2018-01-10T01:36:04.250Z",
        updatedAt: "2018-01-10T01:36:04.250Z"
      }
    };
    const action = {
      type: ADD_REVIEW,
      payload: reviews,
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.reviews[1].review).toEqual('great recipe');
    expect(newState.reviews[1].userId).toEqual(1);
    expect(newState.reviews[1].recipeId).toEqual(8);
    expect(newState.reviews[1].User.username).toEqual('rukkiey');
    expect(newState.reviews[1].User.picture).toEqual('tw2y57mjg7pbdo4dyrci');
  });

  it('should upvote recipe when passed with UPVOTE_RECIPE', () => {
    const { recipeDetails, recipeUpvote } = mockData;
    const initialState = {
      recipes: recipeDetails,
      favoriteRecipes: recipeDetails
    };
    const recipes = recipeUpvote;

    const favoriteRecipes = recipeUpvote;

    const action = {
      type: UPVOTE_RECIPE,
      payload: { data: recipes, favoriteRecipes }
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.recipes[0].upvotes).toEqual(1);
  });

  it('should downvote recipe when passed with DOWNVOTE_RECIPE', () => {
    const { recipeDetails, recipeDownvote } = mockData;
    const initialState = {
      recipes: recipeDetails,
      favoriteRecipes: recipeDetails
    };
    const recipes = recipeDownvote;

    const favoriteRecipes = recipeDownvote;

    const action = {
      type: DOWNVOTE_RECIPE,
      payload: { data: recipes, favoriteRecipes }
    };
    const newState = recipesReducer(initialState, action);
    expect(newState.recipes[1].downvotes).toEqual(1);
  });
});
