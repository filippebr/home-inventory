import knex from 'knex';

const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV === 'test' ? knexConfig.test : knexConfig.development;

const connection = knex(environment);

export default {
  connection
};
