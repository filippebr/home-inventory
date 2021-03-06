// Code used in the files where you need to communicate with the database.
// For Example: connection('table').insert({});
import knex from 'Knex';

const knexConfig = require('../../knexfile');

const environment = process.env.NODE_ENV === 'test' ? knexConfig.test : knexConfig.development;

const connection = knex(environment);

export default connection;
