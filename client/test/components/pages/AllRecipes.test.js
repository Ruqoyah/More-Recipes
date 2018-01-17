import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ConnectedAllRecipes, {
  AllRecipes
} from '../../../components/pages/AllRecipes';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let props;

const setup = () => {
  props = {
    recipes: mockData.recipePropsDetails,
    actions: {
      getAllRecipeAction: jest.fn(() => Promise.resolve()),
      searchRecipesAction: jest.fn(() => Promise.resolve())
    }
  };
  return shallow(<AllRecipes {...props} />);
};

jest.mock('../../../components/common/Header');
jest.mock('../../../components/include/UserRecipesInclude');
jest.mock('../../../components/common/VoteAndFavoriteIcon');

describe('Component: AllRecipes', () => {
  process.env.CLOUD_NAME = 'tyutyuu';

  describe('AllRecipes component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).toBe(4);
      expect(wrapper.find('i').length).toBe(1);
    });
  });

  describe('handlePageChange()', () => {
    const page = {
      selected: 1
    };
    it('should get the next user favorite recipes', () => {
      const spy = sinon.spy(AllRecipes.prototype, 'handlePageChange');
      shallow(<AllRecipes {...props} handlePageChange={spy}/>)
        .instance().handlePageChange(page);
    });
  });

  describe('componentDidMount()', () => {
    it('should call componentDidMount()', () => {
      const spy = sinon.spy(AllRecipes.prototype, 'componentDidMount');
      shallow(<AllRecipes {...props} componentDidMount={spy}/>)
        .instance().componentDidMount({ setState: () => 1 });
    });
  });

  describe('searchHandler()', () => {
    it('should search recipe when input values in state changes', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: { name: 'searchRecipes', value: 'yum yum' }
      };
      action.searchHandler(event);
      expect(action.state.searchRecipes).toBe(event.target.value);
    });

    it('should get all recipes when state does not change', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const event = {
        target: { name: 'searchRecipes', value: '' }
      };
      action.searchHandler(event);
      expect(action.state.loader).toBe(true);
    });
  });

  describe('Connected AllRecipes component', () => {
    it('tests that the component successfully rendered', () => {
      const { recipeDetails } = mockData;
      const store = mockStore({
        auth: {
          user: [{ userId: 1 }]
        },
        recipe: recipeDetails
      });
      const wrapper = shallow(<ConnectedAllRecipes store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
