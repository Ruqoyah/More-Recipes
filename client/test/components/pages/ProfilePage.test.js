import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ConnectedProfilePage, {
  ProfilePage
} from '../../../components/pages/ProfilePage';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let props;

const setup = () => {
  props = {
    user: mockData.userDetails,
    actions: {
      getUserProfileAction: jest.fn()
    }
  };
  return shallow(<ProfilePage {...props} />);
};

jest.mock('../../../components/common/Header');
jest.mock('../../../components/include/ProfilePageInclude');

describe('Component: ProfilePage', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(10);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(2);
    expect(wrapper.find('a').length).toBe(2);
    expect(wrapper.find('h6').length).toBe(3);
    expect(wrapper.find('p').length).toBe(3);
  });

  describe('componentDidMount()', () => {
    it('should get user profile', () => {
      const spy = sinon.spy(ProfilePage.prototype, 'componentDidMount');
      mount(<ProfilePage {...props} componentDidMount={spy}/>);
    });
  });

  describe('Connected ProfilePage component', () => {
    test('renders without crashing', () => {
      const store = mockStore({
        auth: {
          userProfile: [{
            fullName: 'ruqoyah',
            username: 'rukkiey',
            email: 'rukky@gmail.com',
            picture: 'picture.png'
          }]
        }
      });
      const wrapper = shallow(<ConnectedProfilePage store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
