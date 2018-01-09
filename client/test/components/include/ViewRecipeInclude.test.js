import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import {
  ViewRecipeInclude,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/include/ViewRecipeInclude';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

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

jest.mock('../../../components/common/VoteAndFavoriteIcon');

describe('component: ViewRecipeInclude', () => {
  process.env.CLOUD_NAME = 'tyutyuu';
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<ViewRecipeInclude {...props}/>);
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

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.reviewRecipeAction).toBeTruthy();
    expect(mapDispatchToProps(dispatch).actions.getReviewAction).toBeTruthy();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      auth: {
        user: [{ userId: 1 }]
      },
      recipe: {
        reviews: 'nice',
        reviewCount: 4
      }
    };
    expect(mapStateToProps(storeState)).toExist();
  });

  it('should call onChange()', () => {
    const wrapper = mount(<ViewRecipeInclude {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(ViewRecipeInclude.prototype, 'onChange');
    const event = {
      target: { name: 'review', value: 'nice' }
    };
    mount(<ViewRecipeInclude {...props} onChange={spy}/>);
    action.onChange(event);
    expect(action.state.review).toBe(event.target.value);
  });

  it('should call onClick()', () => {
    const spy = sinon.spy(ViewRecipeInclude.prototype, 'onClick');
    mount(<ViewRecipeInclude {...props} onClick={spy}/>)
      .instance().onClick({ preventDefault: () => 1 });
  });

  it('should call onSubmit()', () => {
    const spy = sinon.spy(ViewRecipeInclude.prototype, 'onSubmit');
    mount(<ViewRecipeInclude {...props} onSubmit={spy}/>)
      .instance().onSubmit({ preventDefault: () => 1 });
  });
  afterEach(() => {
    global.process = process;
  });
});
