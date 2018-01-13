import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import mockData from '../_mocks_/mockData';
import {
  getUserRecipeAction,
  getAllRecipeAction,
  searchRecipesAction,
  getFavoriteAction,
  upvoteRecipeAction,
  downvoteRecipeAction,
  viewRecipeAction,
  reviewRecipeAction,
  getReviewAction,
  deleteRecipeAction,
  editRecipeAction,
  saveImageToCloud,
  addRecipeAction,
  favoriteAction
} from '../../actions/recipesActions';
import {
  GET_USER_RECIPES,
  GET_RECIPES,
  SEARCH_RECIPES,
  GET_FAVORITE_RECIPES,
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE,
  ADD_REVIEW,
  VIEW_RECIPE,
  GET_REVIEW,
  EDIT_RECIPE,
  DELETE_RECIPE,
  LOAD_MORE_REVIEWS,
  SAVE_RECIPE_IMAGE
} from '../../actions/types';

const middlewares = [thunk];


const mockStore = configureMockStore(middlewares);
describe('Recipe actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates GET_USER_RECIPES when trying to get user recipes', async (done) => {
    const { getUserRecipes } = mockData;
    moxios.stubRequest(`/api/v1/users/recipes?page=${1}`, {
      status: 200,
      response: getUserRecipes
    });
    const expectedActions = [{ type: GET_USER_RECIPES, payload: getUserRecipes }];
    const store = mockStore({});
    await store.dispatch(getUserRecipeAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates GET_RECIPES when trying to get all recipe', async (done) => {
    const { getRecipes } = mockData;
    moxios.stubRequest(`/api/v1/recipes?page=${1}`, {
      status: 200,
      response: getRecipes
    });
    const expectedActions = [{ type: GET_RECIPES, payload: getRecipes }];
    const store = mockStore({});
    await store.dispatch(getAllRecipeAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates SEARCH_RECIPES when trying to search recipe', async (done) => {
    const { searchRecipes } = mockData;
    moxios.stubRequest(`/api/v1/recipes?search=${'recipe'}`, {
      status: 200,
      response: searchRecipes
    });
    const expectedActions = [{ type: SEARCH_RECIPES, payload: searchRecipes }];
    const store = mockStore({});
    await store.dispatch(searchRecipesAction('recipe'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates GET_FAVORITE_RECIPES when trying to get all recipe', async (done) => {
    const { getRecipes } = mockData;
    moxios.stubRequest(`/api/v1/users/recipes/favorite?page=${1}`, {
      status: 200,
      response: getRecipes
    });
    const expectedActions = [{ type: GET_FAVORITE_RECIPES, payload: getRecipes }];
    const store = mockStore({});
    await store.dispatch(getFavoriteAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates UPVOTE_RECIPE when trying to upvote recipe', async (done) => {
    const { upvotedRecipe } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${1}/upvote`, {
      status: 200,
      response: upvotedRecipe
    });
    const expectedActions = [{ type: UPVOTE_RECIPE, payload: upvotedRecipe }];
    const store = mockStore({});
    await store.dispatch(upvoteRecipeAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates DOWNVOTE_RECIPE when trying to downvote recipe', async (done) => {
    const { downvotedRecipe } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${1}/downvote`, {
      status: 200,
      response: downvotedRecipe
    });
    const expectedActions = [{ type: DOWNVOTE_RECIPE, payload: downvotedRecipe }];
    const store = mockStore({});
    await store.dispatch(downvoteRecipeAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates VIEW_RECIPE when trying to view recipes', async (done) => {
    const { viewedRecipe } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${1}`, {
      status: 200,
      response: viewedRecipe
    });
    const expectedActions = [{ type: VIEW_RECIPE, payload: viewedRecipe }];
    const store = mockStore({});
    await store.dispatch(viewRecipeAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates ADD_REVIEW when trying to post review', async (done) => {
    const { addedReview } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${1}/reviews`, {
      status: 200,
      response: addedReview
    });
    const expectedActions = [{ type: ADD_REVIEW, payload: addedReview }];
    const store = mockStore({});
    await store.dispatch(reviewRecipeAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates GET_REVIEW when trying to view recipes', async (done) => {
    const { getReview } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${1}/reviews?page=${1}`, {
      status: 200,
      response: getReview
    });
    const expectedActions = [{ type: GET_REVIEW, payload: getReview }];
    const store = mockStore({});
    await store.dispatch(getReviewAction(1, 1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates LOAD_MORE_REVIEWS when trying to view more review', async (done) => {
    const { getReview } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${1}/reviews?page=${2}`, {
      status: 200,
      response: getReview
    });
    const expectedActions = [{ type: LOAD_MORE_REVIEWS, payload: getReview }];
    const store = mockStore({});
    await store.dispatch(getReviewAction(1, 2))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates DELETE_RECIPE when trying to view more review', async (done) => {
    const { deletedRecipe } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${1}`, {
      status: 204,
      response: deletedRecipe
    });
    const expectedActions = [{ type: DELETE_RECIPE, id: deletedRecipe.data.id }];
    const store = mockStore({});
    await store.dispatch(deleteRecipeAction(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('creates EDIT_RECIPE when trying to view more review', async (done) => {
    const { editedRecipe, inputRecipeData } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${1}`, {
      status: 200,
      response: editedRecipe
    });
    const expectedActions = [{ type: EDIT_RECIPE, payload: editedRecipe.data }];
    const store = mockStore({});
    await store.dispatch(editRecipeAction(1, inputRecipeData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('should add recipe', async (done) => {
    const { inputRecipeData, addedRecipe } = mockData;
    moxios.stubRequest('/api/v1/recipes', {
      status: 201,
      response: addedRecipe
    });

    await addRecipeAction(inputRecipeData)
      .then(() => {
        expect(addedRecipe.data.message).toEqual('Recipe added successfully');
      });
    done();
  });

  it('should favorite recipe', async (done) => {
    const { addedRecipe } = mockData;
    moxios.stubRequest(`/api/v1/recipes/${1}/favorite`, {
      status: 200,
      response: addedRecipe
    });

    await favoriteAction(1)
      .then(() => {
        expect(addedRecipe.data.message).toEqual('Recipe added successfully');
      });
    done();
  });

  it('creates SAVE_RECIPE_IMAGE when add recipe action is successful', async (done) => {
    global.fetch = jest.fn(() => Promise.resolve());
    const expectedActions = [{ type: SAVE_RECIPE_IMAGE,
      payload: 'picture.png' }];
    const store = mockStore({});
    await store.dispatch(saveImageToCloud('picture.png'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
