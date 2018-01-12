import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';
import expect from 'expect';
import { configure, mount } from 'enzyme';
import {
  ProfilePageInclude,
  mapDispatchToProps,
  mapStateToProps
} from '../../../components/include/ProfilePageInclude';
import mockData from '../../_mocks_/mockData';

configure({ adapter: new Adapter() });
jest.mock('react-router-dom');

const props = {
  usersTempDetails: mockData.userDetails,
  actions: {
    editProfileAction: jest.fn(() => Promise.resolve()),
    saveProfileImage: jest.fn(() => Promise.resolve())
  }
};

describe('component: ProfilePageInclude', () => {
  global.FileReader = () => ({
    readAsDataURL: () => {}
  });
  it('tests that the component successfully rendered', () => {
    const wrapper = mount(<ProfilePageInclude {...props}/>);
    expect(wrapper.find('div').length).toBe(12);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('label').length).toBe(6);
    expect(wrapper.find('input').length).toBe(4);
  });

  it('should ensure mapDispatchToProps returns binded actions', () => {
    const dispatch = jest.fn();
    expect(mapDispatchToProps(dispatch).actions.editProfileAction).toBeTruthy();
    expect(mapDispatchToProps(dispatch).actions.editProfileAction).toBeTruthy();
  });

  it('should ensure mapStateToProps returns prop from redux store', () => {
    const storeState = {
      auth: {
        userProfile: [{
          fullName: 'ruqoyah',
          username: 'rukkiey',
          email: 'rukky@gmail.com',
          picture: 'picture.png'
        }],
        imageUrl: 'picture.png'
      }
    };
    expect(mapStateToProps(storeState)).toExist();
  });

  it('should call onChange()', () => {
    const wrapper = mount(<ProfilePageInclude {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(ProfilePageInclude.prototype, 'onChange');
    const event = {
      target: { name: 'userDetails',
        value: {
          username: 'ruqoyah',
          email: 'rukky@gmail.com',
          fullName: 'rukayat odukoya',
          picture: 'picture.png'
        } }
    };
    mount(<ProfilePageInclude {...props} onChange={spy}/>);
    action.onChange(event);
    expect(action.state.userDetails.userDetails).toBe(event.target.value);
  });

  it('should call onFocus()', () => {
    const wrapper = mount(<ProfilePageInclude {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(ProfilePageInclude.prototype, 'onFocus');
    const event = {
      target: { name: 'imageError', value: '' }
    };
    mount(<ProfilePageInclude {...props} onFocus={spy}/>);
    action.onFocus(event);
    expect(action.state.imageError).toBe(event.target.value);
  });

  it('should call onSubmit()', () => {
    const spy = sinon.spy(ProfilePageInclude.prototype, 'onSubmit');
    mount(<ProfilePageInclude {...props} onSubmit={spy}/>)
      .instance().onSubmit({ preventDefault: () => 1 });
  });

  it('should call uploadImage()', () => {
    const wrapper = mount(<ProfilePageInclude {...props} />);
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
    mount(<ProfilePageInclude {...props} uploadImage={spy}/>);
    action.uploadImage(event);
    action.setState({
      image: event.target.files
    });
    expect(action.state.image).toBe(event.target.files);
  });

  it('should call componentWillReceiveProps()', () => {
    const wrapper = mount(<ProfilePageInclude {...props} />);
    const action = wrapper.instance();
    const spy = sinon.spy(ProfilePageInclude.prototype, 'componentWillReceiveProps');
    const nextProps = {
      user: {
        id: 1,
        username: 'ruqoyah',
        email: 'rukky@gmail.com',
        fullName: 'rukayat odukoya',
        picture: 'picture.png'
      }
    };
    mount(<ProfilePageInclude {...props} componentWillReceiveProps={spy}/>);
    action.componentWillReceiveProps(nextProps);
    expect(action.state.userDetails).toBe(nextProps.user);
  });
});
