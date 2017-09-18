import expect from 'expect';
import supertest from 'supertest';
import app from '../app';
import models from '../server/models';


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
        expect(res.body.username).toBe('temitayo');
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
        expect(res.body.username).toBe('ruqoyah');
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
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid Credentials.');
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
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('User not found');
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
        expect(res.body.message).toBe('You have successfully signed in!');
        done();
      });
  });
  it('User should not be able to get all users', (done) => {
    supertest(app)
      .get('/api/v1/users')
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
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
  it('Admin should be able to get all users', (done) => {
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
        expect(res);
        done();
      });
  });
});

