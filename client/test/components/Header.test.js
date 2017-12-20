// import React from 'react';
// import expect from 'expect';
// import sinon from 'sinon';
// import { configure, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-15';
// import { Header } from '../../Components/Common/Header';
// // import mockData from '../_mocks_/mockData';

// configure({ adapter: new Adapter() });

// const props = {
//   // user: mockData.userDetails,
//   actions: {
//     logoutAction: jest.fn(),
//     searchRecipesAction: jest.fn(),
//     getAllRecipeAction: jest.fn()
//   }
// };

// jest.mock('react-router-dom');
// // jest.mock('../../Components/Include/ProfilePageInclude');

// describe('Component: Header', () => {
//   it('tests that the component successfully rendered', () => {
//     const wrapper = mount(<Header {...props} />);
//     expect(wrapper.find('div').length).toBe(5);
//     expect(wrapper.find('nav').length).toBe(1);
//     expect(wrapper.find('img').length).toBe(1);
//     expect(wrapper.find('button').length).toBe(2);
//     expect(wrapper.find('ul').length).toBe(1);
//     expect(wrapper.find('input').length).toBe(1);
//     expect(wrapper.find('a').length).toBe(1);
//     expect(wrapper.find('NavLink').length).toBe(4);
//   });

//   // it('tests that it receives the user details', () => {
//   //   const wrapper = mount(<Header/>);
//   //   expect(wrapper.props().user.fullName).toBe('Ruqoyah Odukoya');
//   //   expect(wrapper.props().user.email).toBe('oriyomi@gmail.com');
//   //   expect(wrapper.props().user.picture).toBe('picture.png');
//   //   expect(wrapper.props().user.username).toBe('rookiey');
//   // });

//   it('should call logout()', () => {
//     const spy = sinon.spy(Header.prototype, 'logout');
//     mount(<Header {...props} logout={spy}/>);
//   });

//   it('should call searchHandler()', () => {
//     const spy = sinon.spy(Header.prototype, 'searchHandler');
//     mount(<Header {...props} searchHandler={spy}/>);
//   });
// });
