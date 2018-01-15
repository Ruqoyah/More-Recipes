import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ConnectedViewRecipe, {
  ViewRecipe
} from '../../../components/pages/ViewRecipe';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const props = {
  viewRecipe: mockData.viewRecipeProps,
  match: mockData.viewRecipeProps.match,
  actions: {
    viewRecipeAction: jest.fn(() => Promise.resolve())
  }
};

describe('Component: ViewRecipe', () => {
  describe('ViewRecipe component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = shallow(<ViewRecipe {...props} />);
      expect(wrapper.find('div').length).toBe(2);
    });
  });

  describe('componentDidMount()', () => {
    it('should get viewed recipe details', () => {
      const spy = sinon.spy(ViewRecipe.prototype, 'componentDidMount');
      shallow(<ViewRecipe {...props} componentDidMount={spy}/>)
        .instance().componentDidMount({ setState: () => 1 });
    });
  });

  describe('Connected ViewRecipe component', () => {
    it('renders without crashing', () => {
      const { viewRecipe } = mockData;
      const store = mockStore({
        auth: {
          user: [{ userId: 1 }]
        },
        recipe: viewRecipe
      });
      const wrapper = shallow(<ConnectedViewRecipe store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
