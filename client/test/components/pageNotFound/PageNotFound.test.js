
import React from 'react';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import PageNotFound from '../../../components/pageNotFound/PageNotFound';

configure({ adapter: new Adapter() });

jest.mock('../../../components/common/Header');

describe('Component: PageNotFound', () => {
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<PageNotFound />);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h1').length).toBe(1);
  });
});
