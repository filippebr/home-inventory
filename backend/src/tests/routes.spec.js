import supertest from 'supertest';
import http from 'http';
import app from '../server';

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

  it('Returns Home Inventory API', async () => {
    const response = await request.get('/');
    expect(response.body.message).toBe('🏡📦🥫 Home Inventory API 🥫📦🏡');
  });
});
