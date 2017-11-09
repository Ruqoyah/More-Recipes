import expect from 'expect';
import supertest from 'supertest';
import app from '../app';
import models from '../server/models';

let token;
let userId;

const doBeforeAll = () => {
  before((done) => {
    models.Users.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });
    done();
  });
};

const doBeforeEach = () => {
  beforeEach((done) => {
    models.sequelize.sync();
    done();
  });
};

describe('More-Recipe API: ', () => {
  doBeforeAll();
  doBeforeEach();
  it('should not get users if it does not exist', (done) => {
    supertest(app)
      .get('/api/v1/users')
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoicnVrYXlhdCIsImZ1bGxuYW1lIjoicnVrYXlhdCBvZHVrb3lhIiwiaXNBZG1pbiI6MX0sImlhdCI6MTUwNTY4Nzg0NH0.cG16W4YvYAWdLUjOYpXVp7lZFDn647mRSUSxJUzzFeE'
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No User found');
        done();
      });
  });
  it('should create a new User', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'temitayo',
        fullName: 'test user',
        email: 'temitayo@example.com',
        password: 'mypassword'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You have successfully signed up');
        done();
      });
  });
  it('should not create User with invalid email', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'oriyomi',
        fullName: 'test user',
        email: 'temitayo',
        password: 'mypassword'
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res);
        done();
      });
  });
  it('check user input', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'temi tayo',
        fullName: 'test user',
        email: 'temitayo@example.com',
        password: 'mypassword'
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid Username');
        done();
      });
  });
  it('check user input', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'temitayo',
        fullName: 'test user',
        email: 'temitayo@example.com',
        password: 'mypassword 12',
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid Password');
        done();
      });
  });
  it('check user input', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'temitayo',
        fullName: '  test user',
        email: 'temitayo@example.com',
        password: 'mypassword',
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid Input');
        done();
      });
  });
  it('should not pass back user password with response', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'ruqoyah',
        fullName: 'test user',
        email: 'ruqoyah@example.com',
        password: 'mypassword'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You have successfully signed up');
        done();
      });
  });
  it('should not create user without passing in username', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        fullName: 'test user',
        email: 'kola@example.com',
        password: 'mypassword'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Username is required');
        done();
      });
  });
  it('should check if username exceeds 5 characters', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'test',
        fullName: 'test user',
        email: 'joyce@example.com',
        password: 'mypassword'
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res);
        done();
      });
  });
  it('should check if email is valid', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'ruqoyah',
        fullName: 'test user',
        email: 'testuser1',
        password: 'mypassword'
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res);
        done();
      });
  });
  it('should check if password exceeds 8 characters', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'temitope',
        fullName: 'test user',
        email: 'testuser1@example.com',
        password: 'mypa'
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res);
        done();
      });
  });
  it('should not create user without passing in fullname', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'temitope',
        email: 'temitope@example.com',
        password: 'mypassword'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('fullName is required');
        done();
      });
  });
  it('should not create user without passing in email', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'temitope',
        fullName: 'test user',
        password: 'mypassword'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Email is required');
        done();
      });
  });
  it('should not create user without passing in password', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'temitope',
        fullName: 'test user',
        email: 'temitope@example.com'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Password is required');
        done();
      });
  });
  it('should not create user with same username twice', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'temitayo',
        fullName: 'test user',
        email: 'joyce@example.com',
        password: 'mypassword'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Username already exists');
        done();
      });
  });
  it('should not create user with the same email twice', (done) => {
    supertest(app)
      .post('/api/v1/users/signup')
      .send({
        username: 'temitope',
        fullName: 'text user',
        email: 'temitayo@example.com',
        password: 'mypassword',
        cpassword: 'mypassword'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Email already exists');
        done();
      });
  });
  it('should sign user in', (done) => {
    supertest(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'temitayo',
        password: 'mypassword'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You have successfully signed in!');
        done();
      });
  });
  it('should not sign user in with incorrect password', (done) => {
    supertest(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'temitayo',
        password: 'mypasswor',
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid Credentials');
        done();
      });
  });
  it('should not sign user in with incorrect credential', (done) => {
    supertest(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'temita',
        password: 'mypasswor',
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid Credentials');
        done();
      });
  });
  it('should not pass back user password with response', (done) => {
    supertest(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'temitayo',
        password: 'mypassword',
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        userId = res.body.data.userId;
        token = res.body.data.token;
        expect(res.body.message).toBe('You have successfully signed in!');
        done();
      });
  });
  it('User should not be able to get all users', (done) => {
    supertest(app)
      .get('/api/v1/users')
      .send({
        token: `${token}`
      })
      .expect(403)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res);
        done();
      });
  });
  it('Should not sign up user if username already exist', (done) => {
    supertest(app)
      .post('/api/v1/users/userexist')
      .send({
        username: 'temitayo'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toBe(true);
        done();
      });
  });
  it('Should sign up user if username does not exist', (done) => {
    supertest(app)
      .post('/api/v1/users/userexist')
      .send({
        username: 'gbenga'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toBe(false);
        done();
      });
  });
  it('Should not sign up user if email already exist', (done) => {
    supertest(app)
      .post('/api/v1/users/emailexist')
      .send({
        email: 'temitayo@example.com'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toBe(true);
        done();
      });
  });
  it('Should sign up user if email does not exist', (done) => {
    supertest(app)
      .post('/api/v1/users/emailexist')
      .send({
        email: 'temi@example.com'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toBe(false);
        done();
      });
  });
  it('should be able to edit profile', (done) => {
    supertest(app)
      .put(`/api/v1/user/${userId}`)
      .send({
        username: 'temitayo',
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Profile updated sucessfully!');
        done();
      });
  });
  it('should not be able to edit profile', (done) => {
    supertest(app)
      .put(`/api/v1/user/${userId}`)
      .send({
        username: 'ruqoyah',
        token: `${token}`
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Username already exist');
        done();
      });
  });
  it('should not be able to edit profile', (done) => {
    supertest(app)
      .put(`/api/v1/user/${userId}`)
      .send({
        email: 'ruqoyah@example.com',
        token: `${token}`
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Email already exist');
        done();
      });
  });
  it('should get a particular user details', (done) => {
    supertest(app)
      .get(`/api/v1/users/${userId}`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body);
        done();
      });
  });
  it('should not get user details if it does not exist', (done) => {
    supertest(app)
      .get('/api/v1/users/8')
      .send({
        token: `${token}`
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('user does not exist');
        done();
      });
  });
  it('should be able to get all users', (done) => {
    supertest(app)
      .get('/api/v1/users')
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoicnVrYXlhdCIsImZ1bGxuYW1lIjoicnVrYXlhdCBvZHVrb3lhIiwiaXNBZG1pbiI6MX0sImlhdCI6MTUwNTY4Nzg0NH0.cG16W4YvYAWdLUjOYpXVp7lZFDn647mRSUSxJUzzFeE'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body);
        done();
      });
  });
});

