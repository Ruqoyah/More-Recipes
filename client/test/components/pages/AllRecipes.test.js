import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {
  AllRecipes,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/pages/AllRecipes';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const props = {
  recipes: mockData.recipePropsDetails,
  actions: {
    getAllRecipeAction: jest.fn(() => Promise.resolve()),
    searchRecipesAction: jest.fn(() => Promise.resolve())
  }
};

jest.mock('../../../components/common/Header');
jest.mock('../../../components/include/UserRecipesInclude');
jest.mock('../../../components/common/VoteAndFavoriteIcon');
jest.mock('react-router-dom');

describe('Component: AllRecipes', () => {
  process.env.CLOUD_NAME = 'tyutyuu';
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<AllRecipes {...props} />);
    expect(wrapper.find('div').length).toBe(6);
    expect(wrapper.find('i').length).toBe(1);
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.getAllRecipeAction).toBeTruthy();
    expect(mapDispatchToProps(dispatch).actions.searchRecipesAction).toBeTruthy();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const { recipeDetails } = mockData;
    const storeState = {
      auth: {
        user: [{ userId: 1 }]
      },
      recipe: recipeDetails
    };
    expect(mapStateToProps(storeState)).toExist();
  });

  it('should call componentDidMount()', () => {
    const spy = sinon.spy(AllRecipes.prototype, 'componentDidMount');
    mount(<AllRecipes {...props} componentDidMount={spy}/>)
      .instance().componentDidMount({ setState: () => 1 });
  });

  it('should call searchHandler()', () => {
    const wrapper = mount(<AllRecipes {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(AllRecipes.prototype, 'searchHandler');
    const event = {
      target: { name: 'searchRecipes', value: 'yum yum' }
    };
    mount(<AllRecipes {...props} searchHandler={spy}/>);
    action.searchHandler(event);
    expect(action.state.searchRecipes).toBe(event.target.value);
  });
});
