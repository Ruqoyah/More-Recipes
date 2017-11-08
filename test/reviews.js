import expect from 'expect';
import supertest from 'supertest';
import app from '../app';
import models from '../server/models';

let recipeId;
let userId;
let token;

const doBeforeAll = () => {
  before((done) => {
    models.Reviews.destroy({
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
        userId = res.body.data.userId;
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
        userId: `${userId}`,
        token: `${token}`
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
  it('should not be able to get reviews for recipe', (done) => {
    supertest(app)
      .get(`/api/v1/recipes/${recipeId}/reviews`)
      .send({
        token: `${token}`
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No review found');
        done();
      });
  });
  it('should be able to post reviews for recipe', (done) => {
    supertest(app)
      .post(`/api/v1/recipes/${recipeId}/reviews`)
      .send({
        review: 'Nice! It\'s a good recipe',
        userId: `${userId}`,
        token: `${token}`
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
  it('should check review input', (done) => {
    supertest(app)
      .post('/api/v1/recipes/5/reviews')
      .send({
        review: 'Nice! It\'s a good recipe',
        userId: `${userId}`,
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
  it('should not be able to post reviews if input is invalid', (done) => {
    supertest(app)
      .post(`/api/v1/recipes/${recipeId}/reviews`)
      .send({
        review: '      Nice! It\'s a good recipe',
        userId: `${userId}`,
        token: `${token}`
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid input');
        done();
      });
  });
  it('should not be able to post reviews for recipe if no review inputed', (done) => {
    supertest(app)
      .post(`/api/v1/recipes/${recipeId}/reviews`)
      .send({
        userId: `${userId}`,
        token: `${token}`
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Review can\'t be empty');
        done();
      });
  });
  it('should not be able to post reviews for recipe if no user id', (done) => {
    supertest(app)
      .post(`/api/v1/recipes/${recipeId}/reviews`)
      .send({
        review: 'Nice! It\'s a good recipe',
        token: `${token}`
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You need to enter your user Id');
        done();
      });
  });
  it('should be able to get reviews for recipe', (done) => {
    supertest(app)
      .get(`/api/v1/recipes/${recipeId}/reviews`)
      .send({
        token: `${token}`
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
