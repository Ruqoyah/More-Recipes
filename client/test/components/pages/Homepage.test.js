import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import HomePage from '../../../components/pages/Homepage';
import mockLocalStorage from '../../_mocks_/mockLocalStorage';

window.localStorage = mockLocalStorage;

configure({ adapter: new Adapter() });

jest.mock('react-router-dom');

describe('Component: HomePage', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<HomePage />);
    expect(wrapper.find('div').length).toBe(11);
    expect(wrapper.find('a').length).toBe(2);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('span').length).toBe(5);
    expect(wrapper.find('img').length).toBe(4);
    expect(wrapper.find('h5').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(3);
  });
});
