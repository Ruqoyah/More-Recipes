import expect from 'expect';
import supertest from 'supertest';
import app from '../../app';
import models from '../models';

let recipeId;
let token;

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
        token = res.body.data.token;
        expect(res.body.message).toBe('You have successfully signed in!');
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
        picture: 'http://localhost:8000/images/dessert%20salad.png',
        token: `${token}`
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        recipeId = res.body.data.id;
        expect(res.body.message).toBe('Recipe added successfully');
        done();
      });
  });
  it('should not be able to get favorite recipes that does not exist', (done) => {
    supertest(app)
      .get('/api/v1/users/recipes?page=1')
      .send({
        token: `${token}`
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
        token: `${token}`
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
  it('should be able to add favorite recipes', (done) => {
    supertest(app)
      .post(`/api/v1/users/${recipeId}/recipes`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You already favorite recipe');
        done();
      });
  });
  it('should not be able to add favorite recipes if no recipe id', (done) => {
    supertest(app)
      .post('/api/v1/users/8/recipes')
      .send({
        token: `${token}`
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
  it('should be able to get favorite recipes', (done) => {
    supertest(app)
      .get('/api/v1/users/recipes?page=1')
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
});
