import supertest from 'supertest';
import app from '../app';

export const server = supertest.agent(app);
