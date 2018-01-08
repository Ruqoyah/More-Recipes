import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Signup, mapDispatchToProps } from '../../components/pages/Signup';

configure({ adapter: new Adapter() });

const props = {
  actions: {
    signUpAction: jest.fn()
  }
};

jest.mock('react-router-dom');

describe('Component: Signup', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<Signup {...props}/>);
    expect(wrapper.find('div').length).toBe(16);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
  });


  it('should set username in local state', () => {
    const wrapper = mount(<Signup {...props}/>);
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

  it('should set fullName in local state', () => {
    const wrapper = mount(<Signup {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'fullName',
        value: 'rukayat odukoya'
      }
    };
    action.onChange(event);
    expect(action.state.fullName).toEqual('rukayat odukoya');
  });

  it('should set email in local state', () => {
    const wrapper = mount(<Signup {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'email',
        value: 'ruqoyah@gmail.com'
      }
    };
    action.onChange(event);
    expect(action.state.email).toEqual('ruqoyah@gmail.com');
  });

  it('should set password in local state', () => {
    const wrapper = mount(<Signup {...props}/>);
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

  it('should set cpassword in local state', () => {
    const wrapper = mount(<Signup {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'cpassword',
        value: 'johnny123'
      }
    };
    action.onChange(event);
    expect(action.state.cpassword).toEqual('johnny123');
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.signUpAction).toBeTruthy();
  });

  it('should call onChange()', () => {
    const spy = sinon.spy(Signup.prototype, 'onChange');
    mount(<Signup {...props} onChange={spy}/>)
      .instance().onChange({ setState: () => 1 });
  });

  it('should call onFocus()', () => {
    const spy = sinon.spy(Signup.prototype, 'onFocus');
    mount(<Signup {...props} onFocus={spy}/>)
      .instance().onFocus({ event: () => 1 });
  });

  it('should call onBlur()', () => {
    const spy = sinon.spy(Signup.prototype, 'onBlur');
    mount(<Signup {...props} onBlur={spy}/>)
      .instance().onBlur({ event: () => 1 });
  });

  it('should call handleSubmit()', () => {
    const spy = sinon.spy(Signup.prototype, 'handleSubmit');
    mount(<Signup {...props} handleSubmit={spy}/>)
      .instance().handleSubmit({ preventDefault: () => 1 });
  });
});
