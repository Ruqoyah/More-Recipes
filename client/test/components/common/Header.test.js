import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-15';
import ConnectedHeader, {
  Header
} from '../../../components/common/Header';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const props = {
  actions: {
    logoutAction: jest.fn()
  }
};

jest.mock('react-router-dom');

describe('Component: Header', () => {
  describe('Header component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = shallow(<Header {...props} />);
      expect(wrapper.find('div').length).toBe(2);
      expect(wrapper.find('nav').length).toBe(1);
      expect(wrapper.find('ul').length).toBe(1);
      expect(wrapper.find('Link').length).toBe(1);
    });
  });

  it('should call logout()', () => {
    const spy = sinon.spy(Header.prototype, 'logout');
    shallow(<Header {...props} logout={spy}/>)
      .instance().logout({ preventDefault: () => 1 });
  });

  describe('Connected ConnectedHeader component', () => {
    it('renders without crashing', () => {
      const store = mockStore({
        auth: {
          authenticated: true
        }
      });
      const wrapper = shallow(<ConnectedHeader store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
