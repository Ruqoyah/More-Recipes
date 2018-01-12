import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Signup, mapDispatchToProps } from '../../../components/pages/Signup';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';

configure({ adapter: new Adapter() });

window.localStorage = mockLocalStorage;

const props = {
  actions: {
    signUpAction: jest.fn(() => Promise.resolve(1))
  }
};

jest.mock('react-router-dom');

describe('Component: Signup', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });
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
    const wrapper = mount(<Signup {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(Signup.prototype, 'onChange');
    const event = {
      target: { name: 'username', value: 'ruqoyah' }
    };
    mount(<Signup {...props} onChange={spy}/>);
    action.onChange(event);
    expect(action.state.username).toBe(event.target.value);
  });

  it('should clear username error when input box is targeted', () => {
    const wrapper = mount(<Signup {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(Signup.prototype, 'onFocus');
    const event = {
      target: { name: 'username', value: 'joycey' }
    };
    mount(<Signup {...props} onFocus={spy}/>);
    action.onFocus(event);
    expect(action.state.usernameError).toBe('');
  });

  it('should clear password error when input box is targeted', () => {
    const wrapper = mount(<Signup {...props} />);
    const action = wrapper.instance();
    const event = {
      target: { name: 'password', value: 'joyce123' }
    };
    action.onFocus(event);
    expect(action.state.passwordError).toBe('');
  });

  it('should clear cpassword error when input box is targeted', () => {
    const wrapper = mount(<Signup {...props} />);
    const action = wrapper.instance();
    const event = {
      target: { name: 'cpassword', value: 'joyce123' }
    };
    action.onFocus(event);
    expect(action.state.passwordConfirmError).toBe('');
  });

  it('should clear cpassword error when input box is targeted', () => {
    const wrapper = mount(<Signup {...props} />);
    const action = wrapper.instance();
    const event = {
      target: { name: 'email', value: 'joyce@gmail.com' }
    };
    action.onFocus(event);
    expect(action.state.emailError).toBe('');
  });

  it('should call handleSubmit()', () => {
    const spy = sinon.spy(Signup.prototype, 'handleSubmit');
    mount(<Signup {...props} handleSubmit={spy}/>)
      .instance().handleSubmit({ preventDefault: () => 1 });
  });

  it('should set usernameError for invalid input', () => {
    const wrapper = mount(<Signup {...props} />);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'username',
        value: 'joy'
      }
    };

    action.onBlur(event);
    expect(action.state.usernameError)
      .toEqual('Please provide a username with atleast 5 characters');
  });

  it('should set usernameError to be empty for valid input', () => {
    const wrapper = mount(<Signup {...props} />);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'username',
        value: 'joyce'
      }
    };

    action.onBlur(event);
    expect(action.state.usernameError)
      .toEqual('');
  });

  it('should set passwordError for invalid input', () => {
    const wrapper = mount(<Signup {...props} />);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'password',
        value: 'joy'
      }
    };

    action.onBlur(event);
    expect(action.state.passwordError)
      .toEqual('Provide a valid password with minimum of 8 characters');
  });

  it('should set passwordError to be empty for valid input', () => {
    const wrapper = mount(<Signup {...props} />);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'password',
        value: 'joyce123'
      }
    };

    action.onBlur(event);
    expect(action.state.passwordError)
      .toEqual('');
  });

  it('should set passwordConfirmError for invalid input', () => {
    const wrapper = mount(<Signup {...props} />);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'cpassword',
        value: 'joy'
      }
    };

    action.onBlur(event);
    expect(action.state.passwordConfirmError)
      .toEqual('Password does not match');
  });

  it('should call componentWillUnmount()', () => {
    const spy = sinon.spy(Signup.prototype, 'componentWillUnmount');
    mount(<Signup {...props} componentWillUnmount={spy}/>);
  });
});
