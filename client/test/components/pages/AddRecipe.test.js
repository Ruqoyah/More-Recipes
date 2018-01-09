import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {
  AddRecipe,
  mapStateToProps,
  mapDispatchToProps
} from '../../../components/pages/AddRecipe';

configure({ adapter: new Adapter() });

const props = {
  actions: {
    saveImageToCloud: jest.fn()
  }
};

jest.mock('../../../components/common/Header');
jest.mock('react-router-dom');

describe('Component: AddRecipe', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });
  global.FileReader = () => ({
    readAsDataURL: () => {}
  });
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<AddRecipe {...props}/>);
    expect(wrapper.find('div').length).toBe(9);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(3);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('label').length).toBe(1);
    expect(wrapper.find('input').length).toBe(2);
  });


  it('should set recipe name in local state', () => {
    const wrapper = mount(<AddRecipe {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'recipeName',
        value: 'yam'
      }
    };
    action.onChange(event);
    expect(action.state.recipeName).toEqual('yam');
  });

  it('should set ingredient in local state', () => {
    const wrapper = mount(<AddRecipe {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'ingredient',
        value: 'oil and water'
      }
    };
    action.onChange(event);
    expect(action.state.ingredient).toEqual('oil and water');
  });

  it('should set details in local state', () => {
    const wrapper = mount(<AddRecipe {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'details',
        value: 'cook for few minutes'
      }
    };
    action.onChange(event);
    expect(action.state.details).toEqual('cook for few minutes');
  });

  it('should set image in local state', () => {
    const wrapper = mount(<AddRecipe {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'image',
        value: 'picture.png'
      }
    };
    action.onChange(event);
    expect(action.state.image).toEqual('picture.png');
  });

  it('should set imageHeight in local state', () => {
    const wrapper = mount(<AddRecipe {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'imageHeight',
        value: '300px'
      }
    };
    action.onChange(event);
    expect(action.state.imageHeight).toEqual('300px');
  });

  it('should set imageWidth in local state', () => {
    const wrapper = mount(<AddRecipe {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'imageWidth',
        value: '300px'
      }
    };
    action.onChange(event);
    expect(action.state.imageWidth).toEqual('300px');
  });

  it('should set imageError in local state', () => {
    const wrapper = mount(<AddRecipe {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'imageError',
        value: 'image size dimension too small'
      }
    };
    action.onChange(event);
    expect(action.state.imageError).toEqual('image size dimension too small');
  });

  it('should set picture in local state', () => {
    const wrapper = mount(<AddRecipe {...props}/>);
    const action = wrapper.instance();
    const event = {
      target: {
        name: 'picture',
        value: 'image.png'
      }
    };
    action.onChange(event);
    expect(action.state.picture).toEqual('image.png');
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      recipe: {
        imageUrl: [{ name: 'picture.png' }]
      }
    };
    expect(mapStateToProps(storeState)).toExist();
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.saveImageToCloud).toBeTruthy();
  });

  it('should call onClick()', () => {
    const spy = sinon.spy(AddRecipe.prototype, 'onClick');
    mount(<AddRecipe {...props} onClick={spy}/>)
      .instance().onClick({ setState: () => 1 });
  });

  it('should call handleSubmit()', () => {
    const spy = sinon.spy(AddRecipe.prototype, 'handleSubmit');
    mount(<AddRecipe {...props} handleSubmit={spy}/>)
      .instance().handleSubmit({ preventDefault: () => 1 });
  });

  it('should call uploadImage()', () => {
    const wrapper = mount(<AddRecipe {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(AddRecipe.prototype, 'uploadImage');
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
    mount(<AddRecipe {...props} uploadImage={spy}/>);
    action.uploadImage(event);
    action.setState({
      image: event.target.files
    });
    expect(action.state.image).toBe(event.target.files);
  });

  it('should call onFocus()', () => {
    const wrapper = mount(<AddRecipe {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(AddRecipe.prototype, 'onFocus');
    const event = {
      target: { name: 'imageError', value: '' }
    };
    mount(<AddRecipe {...props} onFocus={spy}/>);
    action.onFocus(event);
    expect(action.state.imageError).toBe(event.target.value);
  });
});
