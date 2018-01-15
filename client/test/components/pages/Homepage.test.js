import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import HomePage from '../../../components/pages/Homepage';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';

window.localStorage = mockLocalStorage.setItem("token", "cfgvhjkl");

configure({ adapter: new Adapter() });

const props = {
  history: {
    push: jest.fn()
  }
};

describe('Component: HomePage', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = shallow(<HomePage {...props} />);
    expect(wrapper.find('div').length).toBe(9);
    expect(wrapper.find('a').length).toBe(2);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('span').length).toBe(4);
    expect(wrapper.find('img').length).toBe(4);
    expect(wrapper.find('h5').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(3);
  });
});
