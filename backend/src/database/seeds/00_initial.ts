import * as Knex from "knex";
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const tableNames = require('../../constants/tableNames');
const orderedTableNames = require('../../constants/orderedTableNames');
const countries = require('../../constants/countries');

/**
 * @param {Knex} knex
 */
export async function seed(knex: Knex): Promise<void> {
  await orderedTableNames
    .reduce(async (promise: any, table_name: any) => {
      await promise;

      console.log('Clearing', table_name);

      return knex(table_name).del();
    }, Promise.resolve());

  const password = crypto.randomBytes(15).toString('hex');

  const user = {
    email: 'something@email.com',
    name: 'MF',
    password: await bcrypt.hash(password, 12),
  };

  const [createdUser] = await knex(tableNames.user)
    .insert(user)
    .returning('*');  
  
  console.log('User created:', {
    password,
  }, createdUser);

  await knex(tableNames.country)
    .insert(countries);

  await knex(tableNames.state)
    .insert([{
      name: 'CO',
    }]);
};
