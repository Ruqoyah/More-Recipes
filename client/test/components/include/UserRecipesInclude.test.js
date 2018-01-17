import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import expect from 'expect';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure, shallow } from 'enzyme';
import ConnectedUserRecipesInclude, {
  UserRecipesInclude
} from '../../../components/include/UserRecipesInclude';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let props;

const setup = () => {
  props = {
    recipeName: 'yam',
    ingredient: 'yam and water',
    details: 'cook',
    picture: 'picture.png',
    id: 1,
    actions: {
      editRecipeAction: jest.fn(() => Promise.resolve()),
      deleteRecipeAction: jest.fn(() => Promise.resolve()),
      saveImageToCloud: jest.fn(() => Promise.resolve())
    }
  };
  return shallow(<UserRecipesInclude {...props} />);
};

jest.mock('../../../components/common/VoteAndFavoriteIcon');
jest.mock('react-router-dom');

describe('component: UserRecipesInclude', () => {
  global.FileReader = () => ({
    readAsDataURL: () => {}
  });
  describe('UserRecipesInclude component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).toBe(5);
      expect(wrapper.find('h4').length).toBe(1);
      expect(wrapper.find('button').length).toBe(3);
    });
  });

  describe('onChange()', () => {
    it('should set recipeName to state when input values changes', () => {
      const event = {
        target: { name: 'recipeName', value: '' } };
      const wrapper = setup();
      wrapper.setState({ editRecipe: true });
      const recipeNameInput = wrapper.find('#edit-recipe-name');

      event.target.value = 'yam';
      recipeNameInput.simulate('change', event);

      expect(wrapper.instance().state.recipeName).toBe('yam');
    });

    it('should set ingredient to state when input values changes', () => {
      const event = {
        target: { name: 'ingredient', value: '' } };
      const wrapper = setup();
      wrapper.setState({ editRecipe: true });
      const ingredientInput = wrapper.find('#edit-ingredient');

      event.target.value = 'yam and water';
      ingredientInput.simulate('change', event);

      expect(wrapper.instance().state.ingredient).toBe('yam and water');
    });

    it('should set details state when input values changes', () => {
      const event = {
        target: { name: 'details', value: '' } };
      const wrapper = setup();
      wrapper.setState({ editRecipe: true });
      const detailsInput = wrapper.find('#edit-details');

      event.target.value = 'cook well';
      detailsInput.simulate('change', event);

      expect(wrapper.instance().state.details).toBe('cook well');
    });
  });

  describe('handleViewClick()', () => {
    it('should view recipe whenever button is clicked', () => {
      const spy = sinon.spy(UserRecipesInclude.prototype, 'handleViewClick');
      shallow(<UserRecipesInclude {...props} handleViewClick={spy}/>)
        .instance().handleViewClick({ preventDefault: () => 1 });
    });
  });

  describe('onFocus()', () => {
    it('should clear image error when input box is targeted', () => {
      const wrapper = setup();
      const event = {
        target: { name: 'image', value: 'picture' }
      };
      wrapper.instance().onFocus(event);
      expect(wrapper.instance().state.imageError).toBe('');
    });
  });

  describe('backClick()', () => {
    it('should go back when cancel button is clicked', () => {
      const spy = sinon.spy(UserRecipesInclude.prototype, 'backClick');
      shallow(<UserRecipesInclude {...props} backClick={spy}/>)
        .instance().backClick({ setState: () => 1 });
    });
  });

  describe('editClick()', () => {
    it('should display edit form when button is clicked', () => {
      const spy = sinon.spy(UserRecipesInclude.prototype, 'editClick');
      shallow(<UserRecipesInclude {...props} editClick={spy}/>)
        .instance().editClick({ setState: () => 1 });
    });
  });

  describe('onSubmit()', () => {
    it('should not edit recipe when no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      wrapper.setState({ editRecipe: true });
      const form = wrapper.find('.edit-recipe');
      form.simulate('submit', event);
    });

    it('should not edit recipe if image dimension is small', () => {
      const { smallUserInput } = mockData;
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      wrapper.setState({ editRecipe: true });
      const form = wrapper.find('.edit-recipe');
      wrapper.setState(smallUserInput);

      form.simulate('submit', event);
      expect(wrapper.instance().state.imageError)
        .toBe('Image dimension too small.');
    });

    it('should return error if no picture set to the state',
      () => {
        const { userInput } = mockData;
        const event = {
          preventDefault: jest.fn()
        };
        const wrapper = setup();
        wrapper.setState({ editRecipe: true });
        const form = wrapper.find('.edit-recipe');
        wrapper.setState(userInput);

        form.simulate('submit', event);
      });
  });

  describe('uploadImage()', () => {
    it('should upload recipe picture', () => {
      const wrapper = setup();
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
      shallow(<UserRecipesInclude {...props} uploadImage={spy}/>);
      action.uploadImage(event);
      action.setState({
        image: event.target.files
      });
      expect(action.state.image).toBe(event.target.files);
    });
  });

  describe('onClick()', () => {
    it('should delete recipe when button is clicked', () => {
      const wrapper = shallow(<UserRecipesInclude {...props} />);
      const form = wrapper.find('#delete-recipe');

      form.simulate('click');
    });
  });

  describe('Connected ProfilePageInclude component', () => {
    it('renders without crashing', () => {
      const store = mockStore({
        auth: {
          user: [{ userId: 1 }]
        },
        recipe: {
          imageUrl: 'picture.png'
        }
      });
      const wrapper = shallow(<ConnectedUserRecipesInclude store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
