
const request = require('supertest');

const db = require('../database/dbConfig.js');
const server = require('../api/server');

describe('server', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it("tests are running with DB_ENV set to 'testing'", () => {
    expect(process.env.DB_ENV).toBe('testing');
  });;


});
