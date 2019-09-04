const request = require('supertest');

const db = require('../data/db-config.js');
const server = require('../api/server');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTU2NzYxODI0MSwiZXhwIjoxNTY3NzA0NjQxfQ.PiBQlLoLygufpHi5eUXV1XJhAZqlV616c1IDIxPNYt4';

describe('Server Endpoint Tests', () => {
  beforeAll(async () => {
    // guarantees that the table is cleaned out before any of the tests run
    await db('users').truncate();
  });

  it('tests are running with DB_ENV set to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
  describe('AUTH ROUTES', () => {
    describe('Register, POST /api/auth/register', () => {
      it('succeeds, returns status 201 with correct credentials', () => {
        return request(server)
          .post('/api/auth/register')
          .send({
            username: 'admin',
            password: 'password',
            first_name: 'jest',
            last_name: 'tester',
          })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });

      it('fails. returns status 500 with incorrect credentials', () => {
        return request(server)
          .post('/api/auth/register')
          .send({
            //missing password, password is required to register
            username: 'admin1',
            first_name: 'jest',
          })
          .then(res => {
            expect(res.status).toBe(500);
          });
      });

      it('fails, returns status 500 with missing credentials', () => {
        return request(server)
          .post('/api/auth/register')
          .then(res => {
            expect(res.status).toBe(500);
          });
      });
    });
    describe('Login, POST /api/auth/login', () => {
      it('succeeds, returns status 200 with correct credentials', () => {
        return request(server)
          .post('/api/auth/login')
          .send({
            username: 'admin',
            password: 'password',
          })
          .then(res => {
            expect(res.status).toBe(200);
          });
      });

      it('fails, returns status 401 with incorrect credentials', () => {
        return request(server)
          .post('/api/auth/login')
          .send({
            username: 'notarealuser',
            password: 'notreal',
          })
          .then(res => {
            expect(res.status).toBe(401);
          });
      });

      it('fails, returns status 500 with missing credentials', () => {
        return request(server)
          .post('/api/auth/login')
          .then(res => {
            expect(res.status).toBe(500);
          });
      });
    });
  });

  describe('USERS ROUTES', () => {
    describe('Get all users, GET /api/users', () => {
      it('succeeds, returns status 200 when token is present in header', () => {
        return request(server)
          .get('/api/users')
          .send({
            username: 'admin',
            password: 'password',
          })
          .set('Authorization', token)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });

      it('succeeds, returns array of users when token is present in header', () => {
        return request(server)
          .get('/api/users')
          .set('Authorization', token)
          .then(res => {
            expect(Array.isArray(res.body)).toBe(true);
          });
      });

      it('fails, returns status 400 without token in header', () => {
        return request(server)
          .get('/api/users')
          .then(res => {
            expect(res.status).toBe(400);
          });
      });
    });

    describe('Get a single user using ID, GET /api/users/:id', () => {
      it('succeeds, returns status 200 when given an ID and token is present in header', () => {
        return request(server)
          .get('/api/users/1')
          .set('Authorization', token)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });

      it('succeeds, returns the found user object as JSON when given an ID and token is present in header', () => {
        return request(server)
          .get('/api/users/1')
          .set('Authorization', token)
          .then(res => {
            expect(res.type).toMatch(/json/);
          });
      });

      it('fails, returns status 404 when given an invalid user ID and token is present in header', () => {
        return request(server)
          .get('/api/users/999')
          .set('Authorization', token)
          .then(res => {
            expect(res.status).toBe(404);
          });
      });

      it('fails, returns status 400 without token in header', () => {
        return request(server)
          .get('/api/users/1')
          .then(res => {
            expect(res.status).toBe(400);
          });
      });
    });

    describe('Delete a user, DELETE /api/users/:id', () => {
      it('fails, returns status 404 when given an invalid ID and token is present in header', () => {
        return request(server)
          .delete('/api/users/999')
          .set('Authorization', token)
          .then(res => {
            expect(res.status).toBe(404);
          });
      });

      it('fails, returns status 400 when given a valid ID without token in header', () => {
        return request(server)
          .delete('/api/users/1')
          .then(res => {
            expect(res.status).toBe(400);
          });
      });

      it('succeeds, returns status 200 when given a valid ID and token is present in header', () => {
        return (
          request(server)
            .delete('/api/users/1')
            .set('Authorization', token)
            .then(res => {
              expect(res.status).toBe(200);
            })
        );
      });
    });
  });
});
