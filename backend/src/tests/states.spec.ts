import http from 'http';
import supertest from 'supertest';

import app from '../server';

describe('GET /api/v1/states', () => {
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

  it('should respond with an array of states', async () => {
    const response = await request
      .get('/api/v1/states')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual([]);
  });
});
