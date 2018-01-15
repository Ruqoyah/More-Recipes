import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-15';
import ConnectedUserRecipes, {
  UserRecipes
} from '../../../components/pages/UserRecipes';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const props = {
  userRecipes: mockData.recipeDetails,
  actions: {
    getUserRecipeAction: jest.fn(() => Promise.resolve())
  }
};

describe('Component: UserRecipes', () => {
  describe('UserRecipes component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = shallow(<UserRecipes {...props} />);
      expect(wrapper.find('div').length).toBe(2);
    });
  });

  describe('componentDidMount()', () => {
    it('should get user recipes', () => {
      const spy = sinon.spy(UserRecipes.prototype, 'componentDidMount');
      shallow(<UserRecipes {...props} componentDidMount={spy}/>)
        .instance().componentDidMount({ setState: () => 1 });
    });
  });

  describe('handlePageChange()', () => {
    it('should get the next user recipes', () => {
      const spy = sinon.spy(UserRecipes.prototype, 'handlePageChange');
      shallow(<UserRecipes {...props} handlePageChange={spy}/>)
        .instance().handlePageChange({ preventDefault: () => 1 });
    });
  });

  describe('Connected UserRecipes component', () => {
    it('renders without crashing', () => {
      const { recipeDetails } = mockData;
      const store = mockStore({
        auth: {
          user: [{ userId: 1 }]
        },
        recipe: recipeDetails
      });
      const wrapper = shallow(<ConnectedUserRecipes store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
