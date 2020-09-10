const request = require('supertest');
const app = require('../app');

describe('Route', () => {
  it('should respond with a message', async () => {
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toEqual('🏡📦🥫 Home Inventory API 🥫📦🏡');
  });
});
