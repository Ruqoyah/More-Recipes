import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import ConnectedAddRecipe, {
  AddRecipe
} from '../../../components/pages/AddRecipe';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let props;

const setup = () => {
  props = {
    actions: {
      saveImageToCloud: jest.fn(() => Promise.resolve())
    }
  };
  return shallow(<AddRecipe {...props} />);
};

jest.mock('../../../components/common/Header');

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

  describe('AddRecipe component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).toBe(7);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('h4').length).toBe(3);
      expect(wrapper.find('button').length).toBe(2);
      expect(wrapper.find('label').length).toBe(1);
      expect(wrapper.find('input').length).toBe(2);
    });
  });

  describe('onChange()', () => {
    it('should set recipeName to state when input values changes', () => {
      const event = {
        target: { name: 'recipeName', value: '' } };
      const wrapper = setup();
      const recipeNameInput = wrapper.find('#recipe-name');

      event.target.value = 'yam';
      recipeNameInput.simulate('change', event);

      expect(wrapper.instance().state.recipeName).toBe('yam');
    });

    it('should set ingredient state when input values changes', () => {
      const event = {
        target: { name: 'ingredient', value: '' } };
      const wrapper = setup();
      const ingredientInput = wrapper.find('#ingredient');

      event.target.value = 'yam and water';
      ingredientInput.simulate('change', event);

      expect(wrapper.instance().state.ingredient).toBe('yam and water');
    });

    it('should set details state when input values changes', () => {
      const event = {
        target: { name: 'details', value: '' } };
      const wrapper = setup();
      const detailsInput = wrapper.find('#cooking-direction');

      event.target.value = 'cook well';
      detailsInput.simulate('change', event);

      expect(wrapper.instance().state.details).toBe('cook well');
    });
  });

  describe('onClick()', () => {
    it('should redirect state when clicked', () => {
      const spy = sinon.spy(AddRecipe.prototype, 'onClick');
      shallow(<AddRecipe {...props} onClick={spy}/>)
        .instance().onClick({ setState: () => 1 });
    });
  });

  describe('handleSubmit()', () => {
    it('should not add recipe when nothing set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.add-recipe-form');

      form.simulate('submit', event);
    });

    it('should set imageError to state when no image dimension too small',
      () => {
        const { smallUserInput } = mockData;
        const event = {
          preventDefault: jest.fn()
        };
        const wrapper = setup();
        const form = wrapper.find('.add-recipe-form');
        wrapper.setState(smallUserInput);

        form.simulate('submit', event);
        expect(wrapper.instance().state.imageError)
          .toBe('Image dimension too small');
      });

    it('should set imageError to state when no image provided', () => {
      const { incompleteUserInput } = mockData;
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.add-recipe-form');
      wrapper.setState(incompleteUserInput);

      form.simulate('submit', event);
      expect(wrapper.instance().state.imageError)
        .toBe('No Image provided');
    });

    it('should return error is no picture set to the state',
      () => {
        const { userInput } = mockData;
        const event = {
          preventDefault: jest.fn()
        };
        const wrapper = setup();
        const form = wrapper.find('.add-recipe-form');
        wrapper.setState(userInput);

        form.simulate('submit', event);
      });
  });

  it('should call uploadImage()', () => {
    const wrapper = shallow(<AddRecipe {...props} />);
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
    shallow(<AddRecipe {...props} uploadImage={spy}/>);
    action.uploadImage(event);
    action.setState({
      image: event.target.files
    });
    expect(action.state.image).toBe(event.target.files);
  });

  it('should call onFocus()', () => {
    const wrapper = shallow(<AddRecipe {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(AddRecipe.prototype, 'onFocus');
    const event = {
      target: { name: 'imageError', value: '' }
    };
    shallow(<AddRecipe {...props} onFocus={spy}/>);
    action.onFocus(event);
    expect(action.state.imageError).toBe(event.target.value);
  });

  describe('Connected AddRecipe component', () => {
    it('tests that the component successfully rendered', () => {
      const store = mockStore({
        recipe: {
          imageUrl: [{ name: 'picture.png' }]
        }
      });
      const wrapper = shallow(<ConnectedAddRecipe store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
