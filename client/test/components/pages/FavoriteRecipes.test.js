import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {
  FavoriteRecipes,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/pages/FavoriteRecipes';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const props = {
  favoriteRecipes: mockData.favoriteRecipeDetails,
  actions: {
    getFavoriteAction: jest.fn(() => Promise.resolve())
  }
};

jest.mock('../../../components/common/Header');
jest.mock('../../../components/common/VoteAndFavoriteIcon');

describe('Component: FavoriteRecipes', () => {
  process.env.CLOUD_NAME = 'tyutyuu';
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<FavoriteRecipes {...props} />);
    expect(wrapper.find('div').length).toBe(4);
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.getFavoriteAction).toBeTruthy();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const { recipeDetails } = mockData;
    const storeState = {
      auth: {
        user: [{ userId: 1 }]
      },
      recipe: recipeDetails
    };
    const ownProps = {
      match: {
        path: '/'
      }
    };
    expect(mapStateToProps(storeState, ownProps)).toExist();
  });

  it('should call componentDidMount()', () => {
    const spy = sinon.spy(FavoriteRecipes.prototype, 'componentDidMount');
    mount(<FavoriteRecipes {...props} componentDidMount={spy}/>)
      .instance().componentDidMount({ setState: () => 1 });
  });
});
