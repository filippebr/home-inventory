const supertest = require('supertest');
const http = require('http');
const app = require('../app');

describe('Route', () => {
  let server;
  let request;

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

  it('Returns Home Invetory API', async () => {
    const response = await request.get('/');
    expect(response.body.message).toBe('🏡📦🥫 Home Inventory API 🥫📦🏡');
  });
});
