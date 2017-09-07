import expect from 'expect';
import request from 'supertest';
import app from '../app';
import models from '../server/models';

const doBeforeAll = () => {
  before((done) => {
    models.Recipes.destroy({
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
  it('should not add recipe without providing a token', (done) => {
    request(app)
      .post('/api/v1/recipes')
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
      .post('/api/v1/recipes')
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
      .post('/api/v1/recipes')
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
      .post('/api/v1/recipes')
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
      .post('/api/v1/recipes')
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
      .post('/api/v1/recipes')
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

