import expect from 'expect';
import moxios from 'moxios';
import mockData from '../_mocks_/mockData';
import { userOrEmailExist } from '../../helper/index';

describe('Recipe actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should check if email exist', async (done) => {
    const { userExist } = mockData;
    moxios.stubRequest('/api/v1/users/exist', {
      status: 200,
      response: userExist
    });

    await userOrEmailExist('email@gmail.com')
      .then(() => {
        expect(userExist.data.status).toEqual(true);
      });
    done();
  });
});
