import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ConnectedFavoriteRecipes, {
  FavoriteRecipes
} from '../../../components/pages/FavoriteRecipes';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const props = {
  favoriteRecipes: mockData.favoriteRecipeDetails,
  actions: {
    getFavoriteAction: jest.fn(() => Promise.resolve())
  }
};
const ownProps = {
  match: {
    path: '/'
  }
};

jest.mock('../../../components/common/Header');
jest.mock('../../../components/common/VoteAndFavoriteIcon');

describe('Component: FavoriteRecipes', () => {
  process.env.CLOUD_NAME = 'tyutyuu';

  describe('FavoriteRecipes component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = shallow(<FavoriteRecipes {...props} />);
      expect(wrapper.find('div').length).toBe(2);
    });
  });

  describe('componentDidMount()', () => {
    it('should get user favorite recipes', () => {
      const spy = sinon.spy(FavoriteRecipes.prototype, 'componentDidMount');
      shallow(<FavoriteRecipes {...props} componentDidMount={spy}/>)
        .instance().componentDidMount({ setState: () => 1 });
    });
  });

  describe('handlePageChange()', () => {
    const page = {
      selected: 1
    };
    it('should get the next user favorite recipes', () => {
      const spy = sinon.spy(FavoriteRecipes.prototype, 'handlePageChange');
      shallow(<FavoriteRecipes {...props} handlePageChange={spy}/>)
        .instance().handlePageChange(page);
    });
  });


  describe('Connected FavoriteRecipe component', () => {
    it('tests that the component successfully rendered', () => {
      const { recipeDetails } = mockData;
      const store = mockStore({
        auth: {
          user: [{ userId: 1 }]
        },
        recipe: recipeDetails,
      });
      const wrapper = shallow(<ConnectedFavoriteRecipes {...ownProps}
        store={store}
      />);
      expect(wrapper.length).toBe(1);
    });
  });
});
