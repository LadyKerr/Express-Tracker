const request = require('supertest');

const db = require('../data/db-config.js');
const server = require('../api/server');

describe('server', () => {
  beforeEach(async () => {
    // guarantees that the table is cleaned out before any of the tests run
    await db('users').truncate();
  });

  it('tests are running with DB_ENV set as "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET /', () => {
    it('returns 200 OK', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it('should return a JSON object from the index route', () => {
      const expectedBody = {
        message: "it's alive! Let's track these expenses!",
      };
      return request(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual(expectedBody);
        });
    });
  });

  describe('User Router', () => {
    describe('GET /api/users', () => {
      it('returns 200 OK', () => {
        return request(server)
          .get('/api/users')
          .set(
            'Authorization',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOiJKb3NlTSIsImlhdCI6MTU2NzQ0MDc1MiwiZXhwIjoxNTY3NTI3MTUyfQ.kgT7nP1k6ijdlmzWeD3euXIP8OBRBU4Ftk4HwJ3ca2s',
          )
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });
    describe('POST /api/users', () => {
      it('returns 201 and adds user', () => {
        return request(server)
          .post('/api/auth/register')
          .send({
            username: 'JoseM',
            password: 'testing123',
            first_name: 'Jose',
            last_name: 'M',
          })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
    });
  });
});
