import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import ConnectedProfilePage, {
  ProfilePageInclude
} from '../../../components/include/ProfilePageInclude';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('react-router-dom');

let props;

const setup = () => {
  props = {
    usersTempDetails: mockData.userDetails,
    actions: {
      editProfileAction: jest.fn(() => Promise.resolve()),
      saveProfileImage: jest.fn(() => Promise.resolve())
    }
  };
  return shallow(<ProfilePageInclude {...props} />);
};


describe('component: ProfilePageInclude', () => {
  beforeEach(() => {
    global.toastr = {
      success: () => {},
      error: () => {}
    };
  });
  global.FileReader = () => ({
    readAsDataURL: () => {}
  });

  describe('ProfilePageInclude component', () => {
    it('tests that the component successfully rendered', () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).toBe(12);
      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('label').length).toBe(6);
      expect(wrapper.find('input').length).toBe(4);
    });
  });

  describe('onChange()', () => {
    it('should set username to state when input values changes', () => {
      const event = {
        target: { name: 'username', value: '' } };
      const wrapper = setup();
      const usernameInput = wrapper.find('#profile-username');

      event.target.value = 'joycey';
      usernameInput.simulate('change', event);

      expect(wrapper.instance().state.userDetails.username).toBe('joycey');
    });

    it('should set fullName to state when input values changes', () => {
      const event = {
        target: { name: 'fullName', value: '' } };
      const wrapper = setup();
      const usernameInput = wrapper.find('#profile-fullname');

      event.target.value = 'joycey john';
      usernameInput.simulate('change', event);

      expect(wrapper.instance().state.userDetails.fullName).toBe('joycey john');
    });

    it('should set email to state when input values changes', () => {
      const event = {
        target: { name: 'email', value: '' } };
      const wrapper = setup();
      const usernameInput = wrapper.find('#profile-email');

      event.target.value = 'joycey@test.com';
      usernameInput.simulate('change', event);

      expect(wrapper.instance().state.userDetails.email)
        .toBe('joycey@test.com');
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

  describe('onSubmit()', () => {
    it('should not edit profile when no details set to the state', () => {
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.profile-editing');

      form.simulate('submit', event);
    });

    it('should not edit profile if image dimension is small', () => {
      const { userEditInput } = mockData;
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.profile-editing');
      wrapper.setState(userEditInput);

      form.simulate('submit', event);
      expect(wrapper.instance().state.imageError)
        .toBe('Image dimension too small.');
    });

    it('should edit profile when user details is set to the state', () => {
      const { userEditPictureInput } = mockData;
      const event = {
        preventDefault: jest.fn()
      };
      const wrapper = setup();
      const form = wrapper.find('.profile-editing');
      wrapper.setState(userEditPictureInput);

      form.simulate('submit', event);
    });
  });

  describe('uploadImage()', () => {
    it('should upload profile picture', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const spy = sinon.spy(ProfilePageInclude.prototype, 'uploadImage');
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
      shallow(<ProfilePageInclude {...props} uploadImage={spy}/>);
      action.uploadImage(event);
      action.setState({
        image: event.target.files
      });
      expect(action.state.image).toBe(event.target.files);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('component should receive props', () => {
      const wrapper = setup();
      const action = wrapper.instance();
      const spy = sinon.spy(ProfilePageInclude.prototype,
        'componentWillReceiveProps');
      const nextProps = {
        user: {
          id: 1,
          username: 'ruqoyah',
          email: 'rukky@gmail.com',
          fullName: 'rukayat odukoya',
          picture: 'picture.png'
        }
      };
      shallow(<ProfilePageInclude {...props} componentWillReceiveProps={spy}/>);
      action.componentWillReceiveProps(nextProps);
      expect(action.state.userDetails).toBe(nextProps.user);
    });
  });

  describe('Connected ProfilePageInclude component', () => {
    it('renders without crashing', () => {
      const store = mockStore({
        auth: {
          userProfile: [{
            fullName: 'ruqoyah',
            username: 'rukkiey',
            email: 'rukky@gmail.com',
            picture: 'picture.png'
          }],
          imageUrl: 'picture.png'
        }
      });
      const wrapper = shallow(<ConnectedProfilePage store={store} />);
      expect(wrapper.length).toBe(1);
    });
  });
});
