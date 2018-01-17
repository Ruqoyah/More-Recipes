import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import expect from 'expect';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure, shallow, mount } from 'enzyme';
import ConnectedViewRecipeInclude, {
  ViewRecipeInclude
} from '../../../components/include/ViewRecipeInclude';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const props = {
  reviews: mockData.reviewRecipe,
  actions: {
    reviewRecipeAction: jest.fn(),
    getReviewAction: jest.fn()
  },
  user: {
    userId: 2
  },
};

global.reset = () => jest.fn();

jest.mock('../../../components/common/VoteAndFavoriteIcon');

describe('component: ViewRecipeInclude', () => {
  process.env.CLOUD_NAME = 'tyutyuu';

  describe('ViewRecipeInclude component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = shallow(<ViewRecipeInclude {...props}/>);
      expect(wrapper.find('div').length).toBe(16);
      expect(wrapper.find('h4').length).toBe(2);
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.find('h2').length).toBe(1);
      expect(wrapper.find('Image').length).toBe(2);
      expect(wrapper.find('h2').length).toBe(1);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('textarea').length).toBe(1);
      expect(wrapper.find('span').length).toBe(2);
      expect(wrapper.find('i').length).toBe(1);
    });
  });

  describe('onChange()', () => {
    it('should set review to state when input values changes', () => {
      const event = {
        target: { name: 'review', value: '' } };
      const wrapper = shallow(<ViewRecipeInclude {...props} />);
      const reviewInput = wrapper.find('#review-recipe');

      event.target.value = 'nice';
      reviewInput.simulate('change', event);

      expect(wrapper.instance().state.review).toBe('nice');
    });
  });

  describe('onClick()', () => {
    it('should view more if there are more reviews', () => {
      const spy = sinon.spy(ViewRecipeInclude.prototype, 'onClick');
      shallow(<ViewRecipeInclude {...props} onClick={spy}/>)
        .instance().onClick({ preventDefault: () => 1 });
    });
  });

  describe('onSubmit()', () => {
    it('should add review when clicked', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = mount(<ViewRecipeInclude {...props} />);
      const form = wrapper.find('.add-review');

      form.simulate('submit', event);
    });
  });

  describe('Connected ViewRecipeInclude component', () => {
    it('tests that the component successfully rendered', () => {
      const store = mockStore({
        auth: {
          user: [{ userId: 1 }]
        },
        recipe: {
          reviews: 'nice',
          reviewCount: 4
        }
      });
      const wrapper = shallow(<ConnectedViewRecipeInclude store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
