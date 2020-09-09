const request = require('supertest');
const server = require('../server');

describe('Route', () => {
  it('should respond with a message', async () => {
    const response = await request(server)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual('🏡🥫 Home Inventory API 🥫📦🏡');
  });
});
