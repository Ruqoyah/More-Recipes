import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import {
  UserRecipesInclude,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/include/UserRecipesInclude';

configure({ adapter: new Adapter() });

const props = {
  recipeName: 'yam',
  ingredient: 'yam and water',
  details: 'cook',
  picture: 'picture.png',
  actions: {
    editRecipeAction: jest.fn(() => Promise.resolve()),
    deleteRecipeAction: jest.fn(() => Promise.resolve()),
    saveImageToCloud: jest.fn(() => Promise.resolve())
  }
};

jest.mock('../../../components/common/VoteAndFavoriteIcon');
jest.mock('react-router-dom');

describe('component: UserRecipesInclude', () => {
  global.FileReader = () => ({
    readAsDataURL: () => {}
  });
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<UserRecipesInclude {...props}/>);
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('button').length).toBe(3);
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.editRecipeAction).toBeTruthy();
    expect(mapDispatchToProps(dispatch).actions.deleteRecipeAction).toBeTruthy();
    expect(mapDispatchToProps(dispatch).actions.saveImageToCloud).toBeTruthy();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      auth: {
        user: [{ userId: 1 }]
      },
      recipe: {
        imageUrl: 'picture.png'
      }
    };
    expect(mapStateToProps(storeState)).toExist();
  });

  it('should call onChange()', () => {
    const wrapper = mount(<UserRecipesInclude {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(UserRecipesInclude.prototype, 'onChange');
    const event = {
      target: { name: 'recipeName', value: 'yam' }
    };
    mount(<UserRecipesInclude {...props} onChange={spy}/>);
    action.onChange(event);
    expect(action.state.recipeName).toBe(event.target.value);
  });

  it('should call handleViewClick()', () => {
    const spy = sinon.spy(UserRecipesInclude.prototype, 'handleViewClick');
    mount(<UserRecipesInclude {...props} handleViewClick={spy}/>)
      .instance().handleViewClick({ preventDefault: () => 1 });
  });

  it('should call onFocus()', () => {
    const wrapper = mount(<UserRecipesInclude {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(UserRecipesInclude.prototype, 'onFocus');
    const event = {
      target: { name: 'imageError', value: '' }
    };
    mount(<UserRecipesInclude {...props} onFocus={spy}/>);
    action.onFocus(event);
    expect(action.state.imageError).toBe(event.target.value);
  });

  it('should call backClick()', () => {
    const spy = sinon.spy(UserRecipesInclude.prototype, 'backClick');
    mount(<UserRecipesInclude {...props} backClick={spy}/>)
      .instance().backClick({ setState: () => 1 });
  });

  it('should call editClick()', () => {
    const spy = sinon.spy(UserRecipesInclude.prototype, 'editClick');
    mount(<UserRecipesInclude {...props} editClick={spy}/>)
      .instance().editClick({ setState: () => 1 });
  });

  it('should call onSubmit()', () => {
    const spy = sinon.spy(UserRecipesInclude.prototype, 'onSubmit');
    mount(<UserRecipesInclude {...props} onSubmit={spy}/>)
      .instance().onSubmit({ preventDefault: () => 1 });
  });

  it('should call uploadImage()', () => {
    const wrapper = mount(<UserRecipesInclude {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(UserRecipesInclude.prototype, 'uploadImage');
    const event = {
      preventDefault: jest.fn(),
      target: { name: 'image',
        files: [{
          name: "Baked.jpg",
          lastModified: 1515159157000,
          size: 226679,
          type: "image/jpeg",
          webkitRelativePath: ''

        }] }
    };
    mount(<UserRecipesInclude {...props} uploadImage={spy}/>);
    action.uploadImage(event);
    action.setState({
      image: event.target.files
    });
    expect(action.state.image).toBe(event.target.files);
  });

  it('should call onClick()', () => {
    const spy = sinon.spy(UserRecipesInclude.prototype, 'onClick');
    mount(<UserRecipesInclude {...props} onClick={spy}/>)
      .instance().onClick({ sweetalert: () => 1 });
  });
});
