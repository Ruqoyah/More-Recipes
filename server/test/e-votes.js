import expect from 'expect';
import supertest from 'supertest';
import app from '../../app';
import models from '../models';


let recipeId;
let token;

const doBeforeAll = () => {
  before((done) => {
    models.Recipes.destroy({
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
  it('should be able to upvote recipes', (done) => {
    supertest(app)
      .post(`/api/v1/recipes/${recipeId}/upvote`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('upvote successful');
        done();
      });
  });
  it('should not upvote twice', (done) => {
    supertest(app)
      .post(`/api/v1/recipes/${recipeId}/upvote`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('vote removed successfully');
        done();
      });
  });
  it('should be able to downvote recipe', (done) => {
    supertest(app)
      .post(`/api/v1/recipes/${recipeId}/downvote`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('downvote successful');
        done();
      });
  });
  it('should not downvote twice', (done) => {
    supertest(app)
      .post(`/api/v1/recipes/${recipeId}/downvote`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('vote removed successfully');
        done();
      });
  });
  it('should be able to upvote recipe', (done) => {
    supertest(app)
      .post(`/api/v1/recipes/${recipeId}/upvote`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('upvote successful');
        done();
      });
  });
  it('should be able to downvote recipe', (done) => {
    supertest(app)
      .post(`/api/v1/recipes/${recipeId}/downvote`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('vote updated successfully');
        done();
      });
  });
  it('should be able to upvote recipe', (done) => {
    supertest(app)
      .post(`/api/v1/recipes/${recipeId}/upvote`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('vote updated successfully');
        done();
      });
  });
  it('should not upvote recipe if provided recipe id does not exist', (done) => {
    supertest(app)
      .post('/api/v1/recipes/6/upvote')
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
  it('should be able to get recipes with the most upvote', (done) => {
    supertest(app)
      .get('/api/v1/recipes?sort=upvotes&order=descending')
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
