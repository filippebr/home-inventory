// remove this supertest and try to use another module do make the jest tests
import http from 'http';
import supertest from 'supertest';
import app from '../server';
// const supertest = require('supertest');
// const http = require('http');
// const app = require('../app');

describe('Route', () => {
  let server: http.Server;
  let request: any;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('Returns 200', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Returns Home Inventory API', async () => {
    const response = await request.get('/');
    expect(response.body.message).toBe('🏡📦🥫 Home Inventory API 🥫📦🏡');
  });
});
