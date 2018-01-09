import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {
  UserRecipes,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/pages/UserRecipes';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const props = {
  userRecipes: mockData.recipeDetails,
  actions: {
    getUserRecipeAction: jest.fn(() => Promise.resolve())
  }
};

jest.mock('../../../components/common/Header');
jest.mock('../../../components/include/UserRecipesInclude');

describe('Component: UserRecipes', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<UserRecipes {...props} />);
    expect(wrapper.find('div').length).toBe(4);
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.getUserRecipeAction).toBeTruthy();
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
    const spy = sinon.spy(UserRecipes.prototype, 'componentDidMount');
    mount(<UserRecipes {...props} componentDidMount={spy}/>)
      .instance().componentDidMount({ setState: () => 1 });
  });

  it('should call handlePageChange()', () => {
    const spy = sinon.spy(UserRecipes.prototype, 'handlePageChange');
    mount(<UserRecipes {...props} handlePageChange={spy}/>)
      .instance().handlePageChange({ preventDefault: () => 1 });
  });
});
