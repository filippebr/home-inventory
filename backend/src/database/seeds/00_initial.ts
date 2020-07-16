import * as Knex from "knex";
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const tableNames = require('../../constants/tableNames');
const orderedTableNames = require('../../constants/orderedTableNames');

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
    email: 'filippe@email.com',
    name: 'MF',
    password: await bcrypt.hash(password, 12),
  };

  const [createdUser] = await knex(tableNames.user)
    .insert(user)
    .returning('*');

  knex(tableNames.user).insert
  
  console.log('User created:', {
    password,
  }, createdUser);
};
