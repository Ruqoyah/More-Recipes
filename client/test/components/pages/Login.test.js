import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Login, mapDispatchToProps } from '../../../components/pages/Login';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';

configure({ adapter: new Adapter() });

window.localStorage = mockLocalStorage;

const props = {
  actions: {
    loginAction: jest.fn(() => Promise.resolve())
  }
};

jest.mock('react-router-dom');

describe('Component: Login', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<Login {...props}/>);
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('should set recipe name in local state', () => {
    const wrapper = mount(<Login {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'username',
        value: 'username'
      }
    };
    action.onChange(event);
    expect(action.state.username).toEqual('username');
  });

  it('should set ingredient in local state', () => {
    const wrapper = mount(<Login {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'password',
        value: 'johnny123'
      }
    };
    action.onChange(event);
    expect(action.state.password).toEqual('johnny123');
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.loginAction).toBeTruthy();
  });

  it('should call onChange()', () => {
    const wrapper = mount(<Login {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(Login.prototype, 'onChange');
    const event = {
      target: { name: 'username', value: 'ruqoyah' }
    };
    mount(<Login {...props} onChange={spy}/>);
    action.onChange(event);
    expect(action.state.username).toBe(event.target.value);
  });

  it('should clear username error when input box is targeted', () => {
    const wrapper = mount(<Login {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(Login.prototype, 'onFocus');
    const event = {
      target: { name: 'username', value: 'ruqoyah' }
    };
    mount(<Login {...props} onFocus={spy}/>);
    action.onFocus(event);
    expect(action.state.loginError).toBe('');
  });

  it('should clear password error when input box is targeted', () => {
    const wrapper = mount(<Login {...props} />);
    const action = wrapper.instance();
    const event = {
      target: { name: 'password', value: 'ruqoyah12' }
    };
    action.onFocus(event);
    expect(action.state.loginError).toBe('');
  });

  it('should call handleSubmit()', () => {
    const wrapper = mount(<Login {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(Login.prototype, 'handleSubmit');
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'redirectUser', value: false }
    };
    mount(<Login {...props} handleSubmit={spy}/>);
    action.handleSubmit(event);
    expect(action.state.redirectUser).toBe(event.target.value);
  });
});
