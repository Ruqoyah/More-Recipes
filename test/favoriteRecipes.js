import expect from 'expect';
import supertest from 'supertest';
import app from '../app';
import models from '../server/models';


let recipeId;
let userId;

const doBeforeAll = () => {
  before((done) => {
    models.favoriteRecipes.destroy({
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
        userId = res.body.data.userId;
        expect(res.body.message).toBe('You have successfully signed in!');
        done();
      });
  });
  it('should not add recipe without providing a token', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        userId: `${userId}`
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
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        userId: `${userId}`,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        recipeId = res.body.data.recipeId;
        expect(res.body.message).toBe('Recipe added successfully');
        done();
      });
  });
  it('should not be able to get favorite recipes that does not exist', (done) => {
    supertest(app)
      .get(`/api/v1/users/${userId}/recipes`)
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No favorite recipe found');
        done();
      });
  });
  it('should be able to add favorite recipes', (done) => {
    supertest(app)
      .post(`/api/v1/users/${recipeId}/recipes`)
      .send({
        userId: `${userId}`,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe(`You successfully choose recipe id ${recipeId} as your favorite recipes`);
        done();
      });
  });
  it('should be able to add favorite recipes to a category', (done) => {
    supertest(app)
      .put(`/api/v1/users/${recipeId}/recipes`)
      .send({
        userId: `${userId}`,
        category: 'junks',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Recipe added to junks category');
        done();
      });
  });
  it('should not be able to add favorite recipes', (done) => {
    supertest(app)
      .post('/api/v1/users/8/recipes')
      .send({
        userId: `${userId}`,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No recipe Id found');
        done();
      });
  });
  it('should not be able to add favorite recipes', (done) => {
    supertest(app)
      .post(`/api/v1/users/${recipeId}/recipes`)
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('User Id can\'t be empty');
        done();
      });
  });
  it('should not be able to add favorite recipes', (done) => {
    supertest(app)
      .post(`/api/v1/users/${recipeId}/recipes`)
      .send({
        userId: 8,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No user Id found');
        done();
      });
  });
  it('should be able to get favorite recipes', (done) => {
    supertest(app)
      .get(`/api/v1/users/${userId}/recipes`)
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
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
