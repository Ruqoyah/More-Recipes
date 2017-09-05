import expect from 'expect';
import request from 'supertest';
import app from '../app';
import models from '../server/models';

const doBeforeAll = () => {
  before((done) => {
    models.Users.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    models.Recipes.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    models.Reviews.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    models.favoriteRecipes.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true
    });

    models.Votes.destroy({
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
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser1',
        fullName: 'test user',
        email: 'testuser1@example.com',
        password: 'mypassword',
        cpassword: 'mypassword'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.username).toBe('testuser1');
        expect(res.body.message).toBe('You have successfully signed up');
        done();
      });
  });
  it('should not pass back user password with response', (done) => {
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser2',
        fullName: 'test user',
        email: 'testuser2@example.com',
        password: 'mypassword',
        cpassword: 'mypassword'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.username).toBe('testuser2');
        done();
      });
  });
  it('should not create user without passing in username', (done) => {
    request(app)
      .post('/api/users/signup')
      .send({
        fullName: 'test user',
        email: 'testuser3@example.com',
        password: 'mypassword',
        cpassword: 'mypassword'
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
  it('should not create user without passing in fullname', (done) => {
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser4',
        email: 'testuser4@example.com',
        password: 'mypassword',
        cpassword: 'mypassword'
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
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser5',
        fullName: 'test user',
        password: 'mypassword',
        cpassword: 'mypassword'
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
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser6',
        fullName: 'test user',
        email: 'testuser6@example.com',
        cpassword: 'mypassword'
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
  it('should not create user without passing in password', (done) => {
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser6',
        fullName: 'test user',
        email: 'testuser6@example.com',
        password: 'mypassword'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You need to confirm your password');
        done();
      });
  });
  it('should not create user with same username twice', (done) => {
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser2',
        fullName: 'test',
        lastname: 'user',
        email: 'testuser3@example.com',
        password: 'mypassword',
        cpassword: 'mypassword'
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
  it('should not create user that password does not match', (done) => {
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser4',
        fullName: 'test',
        lastname: 'user',
        email: 'testuser4@example.com',
        password: 'mypassword',
        cpassword: 'mypasswor'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Password does not match');
        done();
      });
  });
  it('should not create user with same email twice', (done) => {
    request(app)
      .post('/api/users/signup')
      .send({
        username: 'testuser3',
        fullName: 'text user',
        email: 'testuser2@example.com',
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
    request(app)
      .post('/api/users/signin')
      .send({
        username: 'testuser1',
        password: 'mypassword',
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You have successfully signed in!');
        done();
      });
  });
  it('should not sign user in with incorrect password', (done) => {
    request(app)
      .post('/api/users/signin')
      .send({
        username: 'testuser1',
        password: 'mypasswor',
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Wrong password');
        done();
      });
  });
  it('should not sign user in with incorrect credential', (done) => {
    request(app)
      .post('/api/users/signin')
      .send({
        username: 'testuser',
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
    request(app)
      .post('/api/users/signin')
      .send({
        username: 'testuser2',
        email: 'testuser2@example.com',
        password: 'mypassword',
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You have successfully signed in!');
        done();
      });
  });
  it('Get users', (done) => {
    request(app)
      .get('/api/users')
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res);
        done();
      });
  });
  it('should not add recipe without providing a token', (done) => {
    request(app)
      .post('/api/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake'
      })
      .expect(403)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No token provided.');
        done();
      });
  });
  it('should be able to add recipe providing a token', (done) => {
    request(app)
      .post('/api/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Recipe added successfully');
        done();
      });
  });
  it('should not be able to add recipe with an invalid token', (done) => {
    request(app)
      .post('/api/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXlIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Failed to authenticate token.');
        done();
      });
  });
  it('should not create recipe without recipe name', (done) => {
    request(app)
      .post('/api/recipes')
      .send({
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Enter recipe name');
        done();
      });
  });
  it('should not create recipe without ingredient', (done) => {
    request(app)
      .post('/api/recipes')
      .send({
        recipeName: 'Pizza',
        details: 'grind pepper and onion then bake',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Input ingredient');
        done();
      });
  });
  it('should not create recipe without details', (done) => {
    request(app)
      .post('/api/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Input details');
        done();
      });
  });
});

