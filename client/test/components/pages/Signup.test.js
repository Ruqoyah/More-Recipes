import React from 'react';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ConnectedSignup, {
  Signup
} from '../../../components/pages/Signup';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage.setItem("token", "cfgvhjkl");

let props;

const userInput = {
  username: 'ruqoyah',
  fullName: 'rukayat odukoya',
  email: 'ruqoyah@test.com',
  password: 'ruqoyah123',
  cpassword: 'ruqoyah123'
};

const setup = () => {
  props = {
    history: {
      push: jest.fn()
    },
    actions: {
      signUpAction: jest.fn(() => Promise.resolve())
    }
  };
  return shallow(<Signup {...props} />);
};

describe('Component: Signup', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('Signup component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).toBe(16);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('h4').length).toBe(1);
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.find('Link').length).toBe(1);
    });
  });

  describe('onChange()', () => {
    it('should set username to state when input values changes', () => {
      const event = {
        target: { name: 'username', value: '' } };
      const wrapper = setup();
      const usernameInput = wrapper.find('#signup-username');

      event.target.value = 'ruqoyah';
      usernameInput.simulate('change', event);

      expect(wrapper.instance().state.username).toBe('ruqoyah');
    });

    it('should set fullName state when input values changes', () => {
      const event = {
        target: { name: 'fullName', value: '' } };
      const wrapper = setup();
      const fullNameInput = wrapper.find('#signup-fullName');

      event.target.value = 'rukayat odukoya';
      fullNameInput.simulate('change', event);

      expect(wrapper.instance().state.fullName).toBe('rukayat odukoya');
    });

    it('should set email state when input values changes', () => {
      const event = {
        target: { name: 'email', value: '' } };
      const wrapper = setup();
      const emailInput = wrapper.find('#signup-email');

      event.target.value = 'rukayat@test.com';
      emailInput.simulate('change', event);

      expect(wrapper.instance().state.email).toBe('rukayat@test.com');
    });

    it('should set password state when input values changes', () => {
      const event = {
        target: { name: 'password', value: '' } };
      const wrapper = setup();
      const passwordInput = wrapper.find('#signup-password');

      event.target.value = 'mypassword';
      passwordInput.simulate('change', event);

      expect(wrapper.instance().state.password).toBe('mypassword');
    });

    it('should set cpassword state when input values changes', () => {
      const event = {
        target: { name: 'cpassword', value: '' } };
      const wrapper = setup();
      const cpasswordInput = wrapper.find('#signup-password');

      event.target.value = 'mypassword';
      cpasswordInput.simulate('change', event);

      expect(wrapper.instance().state.cpassword).toBe('mypassword');
    });
  });

  describe('handleSubmit()', () => {
    it('should not signup user when no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.signup-form');

      form.simulate('submit', event);
    });

    it('should signup user when user details is set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.signup-form');
      wrapper.setState(userInput);

      form.simulate('submit', event);
    });
  });

  describe('onFocus()', () => {
    it('should clear username error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'username', value: 'joycey' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.usernameError).toBe('');
    });

    it('should clear password error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'password', value: 'joyce123' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.passwordError).toBe('');
    });

    it('should clear cpassword error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'cpassword', value: 'joyce123' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.passwordConfirmError).toBe('');
    });

    it('should clear cpassword error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'email', value: 'joyce@gmail.com' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.emailError).toBe('');
    });
  });

  describe('onBlur()', () => {
    it('should set usernameError for invalid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'username',
          value: 'joy'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.usernameError)
        .toEqual('Please provide a username with atleast 5 characters');
    });

    it('should set usernameError to be empty for valid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'username',
          value: 'joyce'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.usernameError)
        .toEqual('');
    });

    it('should set passwordError for invalid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'password',
          value: 'joy'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.passwordError)
        .toEqual('Provide a valid password with minimum of 8 characters');
    });

    it('should set passwordError to be empty for valid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'password',
          value: 'joyce123'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.passwordError)
        .toEqual('');
    });

    it('should set passwordConfirmError for invalid input', () => {
      const wrapper = setup();
      const event = {
        target: {
          name: 'cpassword',
          value: 'joy'
        }
      };
      wrapper.instance().onBlur(event);
      expect(wrapper.instance().state.passwordConfirmError)
        .toEqual('Password does not match');
    });
  });

  describe('Connected Signup component', () => {
    it('tests that the component successfully rendered', () => {
      const store = mockStore({});
      const wrapper = shallow(<ConnectedSignup store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
