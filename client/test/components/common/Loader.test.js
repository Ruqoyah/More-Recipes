
import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Loader from '../../../components/common/Loader';

configure({ adapter: new Adapter() });


describe('Component: Loader', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<Loader />);
    expect(wrapper.find('i').length).toBe(1);
  });
});
