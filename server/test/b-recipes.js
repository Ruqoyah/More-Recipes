import expect from 'expect';
import supertest from 'supertest';
import app from '../../app';
import models from '../models';

let recipeId;
let token;
let otherToken;

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
  it('should sign user in', (done) => {
    supertest(app)
      .post('/api/v1/users/signin')
      .send({
        username: 'ruqoyah',
        password: 'mypassword'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        otherToken = res.body.data.token;
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
        picture: 'http://localhost:8000/images/dessert%20salad.png'
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
  it('should not add the same recipe name twice', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        picture: 'http://localhost:8000/images/dessert%20salad.png',
        token: `${token}`
      })
      .expect(409)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('You have already created recipe');
        done();
      });
  });
  it('should be able to search recipe', (done) => {
    supertest(app)
      .get('/api/v1/recipes?search=pizza')
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
  it('should not be able to add recipe with an invalid token', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        picture: 'http://localhost:8000/images/dessert%20salad.png',
        token: 'dsjghkdDWHSJkjdskldsxkldsjkldsxdslk'
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Failed to authenticate token.');
        done();
      });
  });
  it('should not create recipe without recipe name', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        picture: 'http://localhost:8000/images/dessert%20salad.png',
        token: `${token}`
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
  it('should not create recipe with invalid recipe name', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: '  Rice',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        picture: 'http://localhost:8000/images/dessert%20salad.png',
        token: `${token}`
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid Recipe Name');
        done();
      });
  });
  it('should not create recipe with invalid ingredient', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Rice',
        ingredient: '  pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        picture: 'http://localhost:8000/images/dessert%20salad.png',
        token: `${token}`
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid Ingredient');
        done();
      });
  });
  it('should not create recipe with invalid details', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Rice',
        ingredient: 'pepper, flour, onions',
        details: '   grind pepper and onion then bake',
        picture: 'http://localhost:8000/images/dessert%20salad.png',
        token: `${token}`
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid Details');
        done();
      });
  });
  it('should not create recipe without ingredient', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Pizza',
        details: 'grind pepper and onion then bake',
        picture: 'http://localhost:8000/images/dessert%20salad.png',
        token: `${token}`
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
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        picture: 'http://localhost:8000/images/dessert%20salad.png',
        token: `${token}`
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
  it('should be able to modify recipe', (done) => {
    supertest(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .send({
        recipeName: 'Meat Pie',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        token: `${token}`,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Recipe modified successfully!');
        done();
      });
  });
  it('should not be able to modify recipe', (done) => {
    supertest(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .send({
        recipeName: 'Pie',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        token: `${otherToken}`,
      })
      .expect(403)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('sorry! you can only edit your own recipe');
        done();
      });
  });
  it('should not be able to modify recipe if recipe id does not exist', (done) => {
    supertest(app)
      .put('/api/v1/recipes/5')
      .send({
        recipeName: 'Meat Pie',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        picture: 'http://localhost:8000/images/dessert%20salad.png',
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
  it('should not be able to get recipes if no match result', (done) => {
    supertest(app)
      .get('/api/v1/recipes?search=book')
      .send({
        token: `${token}`
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No match Recipe found');
        done();
      });
  });
  it('should not be able to get recipes if sorting with invalid name', (done) => {
    supertest(app)
      .get('/api/v1/recipes?sort=job&order=descending')
      .send({
        token: `${token}`
      })
      .expect(403)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid Request');
        done();
      });
  });
  it('should not delete recipe if passed in invalid recipe id', (done) => {
    supertest(app)
      .delete('/api/v1/recipes/"5"')
      .send({
        token: `${token}`
      })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Invalid recipe id');
        done();
      });
  });
  it('should be able to get all recipes', (done) => {
    supertest(app)
      .get('/api/v1/recipes?page=1')
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
  it('should not show recipes on the next page', (done) => {
    supertest(app)
      .get('/api/v1/recipes?page=2')
      .send({
        token: `${token}`
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Sorry no recipe found for this page');
        done();
      });
  });
  it('should be able to view recipe', (done) => {
    supertest(app)
      .get(`/api/v1/recipes/${recipeId}`)
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
  it('should get user recipes', (done) => {
    supertest(app)
      .get('/api/v1/user/recipes?page=1')
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
  it('should not be able to delete recipe', (done) => {
    supertest(app)
      .delete(`/api/v1/recipes/${recipeId}`)
      .send({
        token: `${otherToken}`
      })
      .expect(403)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('sorry! you can only delete your own recipe');
        done();
      });
  });
  it('should be able to delete recipe', (done) => {
    supertest(app)
      .delete(`/api/v1/recipes/${recipeId}`)
      .send({
        token: `${token}`
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('Recipe deleted successfully!');
        done();
      });
  });
  it('should not be able to get recipes if no recipe', (done) => {
    supertest(app)
      .get('/api/v1/recipes?page=1')
      .send({
        token: `${token}`
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No recipe found');
        done();
      });
  });
  it('should not get recipes if the user does not have recipes', (done) => {
    supertest(app)
      .get('/api/v1/user/recipes?page=1')
      .send({
        token: `${token}`
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toBe('No recipe found');
        done();
      });
  });
});
