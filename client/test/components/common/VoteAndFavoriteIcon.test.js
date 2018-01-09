import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {
  VoteAndFavoriteIcon,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/common/VoteAndFavoriteIcon';

configure({ adapter: new Adapter() });

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
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<VoteAndFavoriteIcon {...props}/>);
    expect(wrapper.find('span').length).toBe(4);
    expect(wrapper.find('a').length).toBe(3);
    expect(wrapper.find('i').length).toBe(3);
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.upvoteRecipeAction).toBeTruthy();
    expect(mapDispatchToProps(dispatch).actions.downvoteRecipeAction).toBeTruthy();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      auth: {
        user: [{ userId: 1 }]
      }
    };
    expect(mapStateToProps(storeState)).toExist();
  });

  it('should call componentWillReceiveProps()', () => {
    const wrapper = mount(<VoteAndFavoriteIcon {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(VoteAndFavoriteIcon.prototype, 'componentWillReceiveProps');
    const nextProps = {
      upvotes: 1,
      downvotes: 1
    };
    mount(<VoteAndFavoriteIcon {...props} componentWillReceiveProps={spy}/>);
    action.componentWillReceiveProps(nextProps);
    expect(action.state.upvotes).toBe(nextProps.upvotes);
    expect(action.state.downvotes).toBe(nextProps.downvotes);
  });

  it('should call handleUpvoteClick()', () => {
    const spy = sinon.spy(VoteAndFavoriteIcon.prototype, 'handleUpvoteClick');
    mount(<VoteAndFavoriteIcon {...props} handleUpvoteClick={spy}/>)
      .instance().handleUpvoteClick({ preventDefault: () => 1 });
  });

  it('should call handleDownvoteClick()', () => {
    const spy = sinon.spy(VoteAndFavoriteIcon.prototype, 'handleDownvoteClick');
    mount(<VoteAndFavoriteIcon {...props} handleDownvoteClick={spy}/>)
      .instance().handleDownvoteClick({ preventDefault: () => 1 });
  });

  it('should call handleFavoriteClick()', () => {
    const spy = sinon.spy(VoteAndFavoriteIcon.prototype, 'handleFavoriteClick');
    mount(<VoteAndFavoriteIcon {...props} handleFavoriteClick={spy}/>)
      .instance().handleFavoriteClick({ preventDefault: () => 1 });
  });
});
