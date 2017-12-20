import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { ProfilePage } from '../../components/pages/ProfilePage';
import mockData from '../_mocks_/mockData';

configure({ adapter: new Adapter() });

const props = {
  user: mockData.userDetails,
  actions: {
    getUserProfileAction: jest.fn()
  }
};

jest.mock('../../components/common/Header');
jest.mock('../../components/include/ProfilePageInclude');

describe('Component: ProfilePage', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<ProfilePage {...props}/>);
    expect(wrapper.find('div').length).toBe(12);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(2);
    expect(wrapper.find('a').length).toBe(2);
    expect(wrapper.find('h6').length).toBe(3);
    expect(wrapper.find('p').length).toBe(5);
  });

  it('tests that it receives the user details', () => {
    const wrapper = mount(<ProfilePage {...props}/>);
    expect(wrapper.props().user.fullName).toBe('Ruqoyah Odukoya');
    expect(wrapper.props().user.email).toBe('oriyomi@gmail.com');
    expect(wrapper.props().user.picture).toBe('picture.png');
    expect(wrapper.props().user.username).toBe('rookiey');
  });

  it('should call componentDidMount()', () => {
    const spy = sinon.spy(ProfilePage.prototype, 'componentDidMount');
    mount(<ProfilePage {...props} componentDidMount={spy}/>);
  });
});
