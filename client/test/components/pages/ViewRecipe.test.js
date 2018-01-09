import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {
  ViewRecipe,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/pages/ViewRecipe';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const props = {
  viewRecipe: mockData.viewRecipeProps,
  match: mockData.viewRecipeProps.match,
  actions: {
    viewRecipeAction: jest.fn(() => Promise.resolve())
  }
};

jest.mock('../../../components/common/Header');
jest.mock('../../../components/include/ViewRecipeInclude');

describe('Component: ViewRecipe', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<ViewRecipe {...props} />);
    expect(wrapper.find('div').length).toBe(4);
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.viewRecipeAction).toBeTruthy();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const { viewRecipe } = mockData;
    const storeState = {
      auth: {
        user: [{ userId: 1 }]
      },
      recipe: viewRecipe
    };
    expect(mapStateToProps(storeState)).toExist();
  });

  it('should call componentDidMount()', () => {
    const spy = sinon.spy(ViewRecipe.prototype, 'componentDidMount');
    mount(<ViewRecipe {...props} componentDidMount={spy}/>)
      .instance().componentDidMount({ setState: () => 1 });
  });
});
