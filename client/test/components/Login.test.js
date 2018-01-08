import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Login, mapDispatchToProps } from '../../components/pages/Login';

configure({ adapter: new Adapter() });

const props = {
  actions: {
    loginAction: jest.fn()
  }
};

jest.mock('react-router-dom');

describe('Component: Login', () => {
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
    const spy = sinon.spy(Login.prototype, 'onChange');
    mount(<Login {...props} onChange={spy}/>)
      .instance().onChange({ setState: () => 1 });
  });

  it('should call onFocus()', () => {
    const spy = sinon.spy(Login.prototype, 'onFocus');
    mount(<Login {...props} onFocus={spy}/>)
      .instance().onFocus({ event: () => 1 });
  });

  it('should call handleSubmit()', () => {
    const spy = sinon.spy(Login.prototype, 'handleSubmit');
    mount(<Login {...props} handleSubmit={spy}/>)
      .instance().handleSubmit({ preventDefault: () => 1 });
  });
});
