import React from 'react';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ConnectedLogin, { Login } from '../../../components/pages/Login';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage.setItem("token", "cfgvhjkl");

let props;

const userInput = {
  username: 'ruqoyah',
  password: 'oriyomi123'
};

const setup = () => {
  props = {
    history: {
      push: jest.fn()
    },
    actions: {
      loginAction: jest.fn(() => Promise.resolve())
    }
  };
  return shallow(<Login {...props} />);
};

describe('Component: Login', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });
  describe('Login component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).toBe(7);
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
      const usernameInput = wrapper.find('#login-username');

      event.target.value = 'ruqoyah';
      usernameInput.simulate('change', event);

      expect(wrapper.instance().state.username).toBe('ruqoyah');
    });

    it('should set password state when input values changes', () => {
      const event = {
        target: { name: 'password', value: '' } };
      const wrapper = setup();
      const passwordInput = wrapper.find('#login-password');

      event.target.value = 'mypassword';
      passwordInput.simulate('change', event);

      expect(wrapper.instance().state.password).toBe('mypassword');
    });
  });

  describe('onFocus()', () => {
    it('should clear username error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'username', value: 'joycey' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.loginError).toBe('');
    });

    it('should clear password error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'password', value: 'joyce123' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.loginError).toBe('');
    });
  });

  describe('handleSubmit()', () => {
    it('should login user when user details is set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.login-form');
      wrapper.setState(userInput);

      form.simulate('submit', event);
    });
  });

  describe('Connected Login component', () => {
    it('tests that the component successfully rendered', () => {
      const store = mockStore({});
      const wrapper = shallow(<ConnectedLogin store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
