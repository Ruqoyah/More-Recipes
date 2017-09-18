import expect from 'expect';
import supertest from 'supertest';
import app from '../app';
import models from '../server/models';


let recipeId;
let userId;

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
  it('should be able to search recipe', (done) => {
    supertest(app)
      .get('/api/v1/recipes?search=pizza')
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
  it('should not be able to add recipe if no user if provided', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
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
  it('should not be able to add recipe if no user if provided', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
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
  it('should not be able to add recipe with an invalid token', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        userId: `${userId}`,
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
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        userId: `${userId}`,
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
  it('should not create recipe with invalid recipe name', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: '  Rice',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        userId: `${userId}`,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(409)
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
        userId: `${userId}`,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(409)
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
        userId: `${userId}`,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(409)
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
        userId: `${userId}`,
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
    supertest(app)
      .post('/api/v1/recipes')
      .send({
        recipeName: 'Pizza',
        ingredient: 'pepper, flour, onions',
        userId: `${userId}`,
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
  it('should be able to modify recipe', (done) => {
    supertest(app)
      .put(`/api/v1/recipes/${recipeId}`)
      .send({
        recipeName: 'Meat Pie',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
        userId: `${userId}`,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
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
  it('should not be able to modify recipe if recipe id does not exist', (done) => {
    supertest(app)
      .put('/api/v1/recipes/5')
      .send({
        recipeName: 'Meat Pie',
        ingredient: 'pepper, flour, onions',
        details: 'grind pepper and onion then bake',
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
  it('should not be able to delete recipe with invalid recipe id provided', (done) => {
    supertest(app)
      .delete('/api/v1/recipes/5')
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
  it('should be able to get all recipes', (done) => {
    supertest(app)
      .get('/api/v1/recipes')
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
  it('should be able to view recipe', (done) => {
    supertest(app)
      .get(`/api/v1/recipes/${recipeId}`)
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
  it('should be able to delete recipe', (done) => {
    supertest(app)
      .delete(`/api/v1/recipes/${recipeId}`)
      .send({
        userId: `${userId}`,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
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
  it('should not be able to get recipes if not exist', (done) => {
    supertest(app)
      .get('/api/v1/recipes')
      .send({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiaWJyYWhpbSIsImZ1bGxuYW1lIjoidG9wZSBqb3kifSwiaWF0IjoxNTA0NTEzMTE2fQ.FzccsjyPbE9ExFKuhZx4ljZUZKGQjtm3CIZY6sqZ5bY'
      })
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res);
        done();
      });
  });
});
