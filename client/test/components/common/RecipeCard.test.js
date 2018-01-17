import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import RecipeCard from '../../../components/common/RecipeCard';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom');
jest.mock('../../../components/common/VoteAndFavoriteIcon');

describe('Component: RecipeCard', () => {
  describe('Recipe card component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = shallow(<RecipeCard />);
      expect(wrapper.find('div').length).toBe(8);
      expect(wrapper.find('Image').length).toBe(1);
      expect(wrapper.find('h4').length).toBe(1);
      expect(wrapper.find('p').length).toBe(2);
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.find('small').length).toBe(2);
    });
  });

  describe('handleViewClick()', () => {
    it('should view recipe whenever button is clicked', () => {
      const spy = sinon.spy(RecipeCard.prototype, 'handleViewClick');
      shallow(<RecipeCard handleViewClick={spy}/>)
        .instance().handleViewClick({ preventDefault: () => 1 });
    });
  });
});
