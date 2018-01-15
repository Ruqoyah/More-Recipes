import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedVoteAndFavoriteIcon, {
  VoteAndFavoriteIcon
} from '../../../components/common/VoteAndFavoriteIcon';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const props = {
  actions: {
    upvoteRecipeAction: jest.fn(),
    downvoteRecipeAction: jest.fn()
  },
  user: {
    userId: 2
  }
};

describe('Component: VoteAndFavoriteIcon', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });

  describe('VoteAndFavoriteIcon component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = shallow(<VoteAndFavoriteIcon {...props}/>);
      expect(wrapper.find('span').length).toBe(4);
      expect(wrapper.find('a').length).toBe(3);
      expect(wrapper.find('i').length).toBe(3);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('component should receive props', () => {
      const wrapper = shallow(<VoteAndFavoriteIcon {...props} />);
      const action = wrapper.instance();
      const spy = sinon.spy(VoteAndFavoriteIcon.prototype,
        'componentWillReceiveProps');
      const nextProps = {
        upvotes: 1,
        downvotes: 1
      };
      shallow(<VoteAndFavoriteIcon {...props} 
        componentWillReceiveProps={spy}/>);
      action.componentWillReceiveProps(nextProps);
      expect(action.state.upvotes).toBe(nextProps.upvotes);
      expect(action.state.downvotes).toBe(nextProps.downvotes);
    });
  });

  describe('handleUpvoteClick()', () => {
    it('should upvote recipe when clicked', () => {
      const spy = sinon.spy(VoteAndFavoriteIcon.prototype,
        'handleUpvoteClick');
      shallow(<VoteAndFavoriteIcon {...props} handleUpvoteClick={spy}/>)
        .instance().handleUpvoteClick({ preventDefault: () => 1 });
    });
  });

  describe('handleDownvoteClick()', () => {
    it('should downvote recipe when clicked', () => {
      const spy = sinon.spy(VoteAndFavoriteIcon.prototype,
        'handleDownvoteClick');
      shallow(<VoteAndFavoriteIcon {...props} handleDownvoteClick={spy}/>)
        .instance().handleDownvoteClick({ preventDefault: () => 1 });
    });
  });

  describe('handleFavoriteClick()', () => {
    it('should favorite recipe when clicked', () => {
      const spy = sinon.spy(VoteAndFavoriteIcon.prototype,
        'handleFavoriteClick');
      shallow(<VoteAndFavoriteIcon {...props} handleFavoriteClick={spy}/>)
        .instance().handleFavoriteClick({ preventDefault: () => 1 });
    });
  });

  describe('Connected ConnectedVoteAndFavoriteIcon component', () => {
    it('renders without crashing', () => {
      const store = mockStore({
        auth: {
          user: [{ userId: 1 }]
        }
      });
      const wrapper = shallow(<ConnectedVoteAndFavoriteIcon store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
