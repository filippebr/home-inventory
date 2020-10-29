import { server, BASE_URL } from './setup';
// import http from 'http';
// import app from '../server';

describe('GET /', () => {
  // let server: http.Server;
  // let request: any;

  // beforeAll((done) => {
  //   server = http.createServer(app);
  //   server.listen(done);
  //   request = server.agent(server);
  // });

  // afterAll((done) => {
  //   return server && server.close(done);
  // });

  it('should respond with a message', async () => {
    const response = await server
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toBe('🏡📦🥫 Home Inventory API 🥫📦🏡');
  });
});
