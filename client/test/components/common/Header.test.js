import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {
  Header,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/common/Header';

configure({ adapter: new Adapter() });

const props = {
  actions: {
    logoutAction: jest.fn()
  }
};

jest.mock('react-router-dom');

describe('Component: Header', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<Header {...props} />);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('should call logout()', () => {
    const spy = sinon.spy(Header.prototype, 'logout');
    mount(<Header {...props} logout={spy}/>)
      .instance().logout({ preventDefault: () => 1 });
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.logoutAction).toBeTruthy();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      auth: {
        authenticated: true
      }
    };
    expect(mapStateToProps(storeState)).toExist();
  });
});
