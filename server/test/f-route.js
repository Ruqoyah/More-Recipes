import expect from 'expect';
import supertest from 'supertest';
import app from '../../app';

describe('Protected routes (middleware)', () => {
  it('should return \'No token provided.\' (POST /api/v1/recipes)', (done) => {
    supertest(app)
      .post('/api/v1/recipes')
      .end((err, res) => {
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('No token provided.');
        done();
      });
  });
  it('should return \'No token provided.\' (PUT /api/v1/recipes/:recipeId)', (done) => {
    supertest(app)
      .put('/api/v1/recipes/:recipeId')
      .end((err, res) => {
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('No token provided.');
        done();
      });
  });
  it('should return \'No token provided.\' (DELETE /api/v1/recipes/:recipeId)', (done) => {
    supertest(app)
      .delete('/api/v1/recipes/:recipeId')
      .end((err, res) => {
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('No token provided.');
        done();
      });
  });
  it('should return \'No token provided.\' (POST /api/v1/recipes/:recipeId/reviews)', (done) => {
    supertest(app)
      .post('/api/v1/recipes/:recipeId/reviews')
      .end((err, res) => {
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('No token provided.');
        done();
      });
  });
  it('should return \'No token provided.\' (GET /api/v1/recipes/:recipeId/reviews)', (done) => {
    supertest(app)
      .get('/api/v1/recipes/:recipeId/reviews')
      .end((err, res) => {
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('No token provided.');
        done();
      });
  });
  it('should return \'No token provided.\' (POST /api/v1/users/:recipeId/recipes)', (done) => {
    supertest(app)
      .post('/api/v1/recipes/:recipeId/reviews')
      .end((err, res) => {
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('No token provided.');
        done();
      });
  });
  it('should return \'No token provided.\' (GET /api/v1/users/recipes)', (done) => {
    supertest(app)
      .get('/api/v1/users/recipes')
      .end((err, res) => {
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('No token provided.');
        done();
      });
  });
  it('should return \'No token provided.\' (POST /api/v1/users/upvote/:recipeId)', (done) => {
    supertest(app)
      .post('/api/v1/users/upvote/:recipeId')
      .end((err, res) => {
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('No token provided.');
        done();
      });
  });
  it('should return \'No token provided.\' (POST /api/v1/users/downvote/:recipeId)', (done) => {
    supertest(app)
      .post('/api/v1/users/downvote/:recipeId')
      .end((err, res) => {
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('No token provided.');
        done();
      });
  });
  it('should return \'No token provided.\' (GET /api/v1/recipes/sort=upvotes&order=descending)', (done) => {
    supertest(app)
      .get('/api/v1/recipes/sort=upvotes&order=descending')
      .end((err, res) => {
        expect(res.status).toBe(403);
        expect(res.body.message).toBe('No token provided.');
        done();
      });
  });
});
