import expect from 'expect';
import supertest from 'supertest';
import app from '../../app';

describe('Protected routes (middleware)', () => {
  describe('(POST /api/v1/recipes)', () => {
    it('should return \'No token provided.\' if not logged in', (done) => {
      supertest(app)
        .post('/api/v1/recipes')
        .end((err, res) => {
          expect(res.status).toBe(401);
          expect(res.body.message).toBe('No token provided.');
          done();
        });
    });
  });

  describe('(PUT /api/v1/recipes/:recipeId)', () => {
    it('should return \'No token provided.\' if not logged in',
      (done) => {
        supertest(app)
          .put('/api/v1/recipes/:recipeId')
          .end((err, res) => {
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });
  });

  describe('(DELETE /api/v1/recipes/:recipeId)', () => {
    it('should return \'No token provided.\' if not logged in',
      (done) => {
        supertest(app)
          .delete('/api/v1/recipes/:recipeId')
          .end((err, res) => {
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });
  });

  describe('(POST /api/v1/recipes/:recipeId/reviews)', () => {
    it('should return \'No token provided.\' if not logged in',
      (done) => {
        supertest(app)
          .post('/api/v1/recipes/:recipeId/reviews')
          .end((err, res) => {
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });
  });

  describe('(GET /api/v1/recipes/:recipeId/reviews)', () => {
    it('should return \'No token provided.\' if not logged in',
      (done) => {
        supertest(app)
          .get('/api/v1/recipes/:recipeId/reviews')
          .end((err, res) => {
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });
  });

  describe('(POST /api/v1/users/:recipeId/recipes)', () => {
    it('should return \'No token provided.\' if not logged in',
      (done) => {
        supertest(app)
          .post('/api/v1/recipes/:recipeId/reviews')
          .end((err, res) => {
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });
  });

  describe('(GET /api/v1/users/recipes)', () => {
    it('should return \'No token provided.\' if not logged in',
      (done) => {
        supertest(app)
          .get('/api/v1/users/recipes')
          .end((err, res) => {
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });
  });

  describe('(POST /api/v1/users/upvote/:recipeId)', () => {
    it('should return \'No token provided.\' if not logged in',
      (done) => {
        supertest(app)
          .post('/api/v1/recipes/:recipeId/upvote')
          .end((err, res) => {
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });
  });

  describe('(POST /api/v1/users/downvote/:recipeId)', () => {
    it('should return \'No token provided.\' if not logged in',
      (done) => {
        supertest(app)
          .post('/api/v1/recipes/:recipeId/downvote')
          .end((err, res) => {
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });
  });

  describe('(GET /api/v1/recipes/sort=upvotes&order=descending)', () => {
    it('should return \'No token provided.\' if not logged in',
      (done) => {
        supertest(app)
          .get('/api/v1/recipes/sort=upvotes&order=descending')
          .end((err, res) => {
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('No token provided.');
            done();
          });
      });
  });

  describe('(GET /api/v1)', () => {
    it('should return welcome to More recipes API',
      (done) => {
        supertest(app)
          .get('/api/v1')
          .end((err, res) => {
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Welcome to More recipes API.');
            done();
          });
      });
  });
});
