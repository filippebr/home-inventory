/* eslint-disable camelcase */
import Knex from 'knex';

import tableNames from '../../constants/tableNames';

import {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references
} from '../../../src/lib/tableUtils';

export async function up (knex: Knex): Promise<void> {
  const user = knex.schema.createTable(tableNames.user, table => {
    table.increments().notNullable();
    email(table, 'email').notNullable().unique();
    table.string('name').notNullable();
    table.string('password', 127).notNullable();
    table.dateTime('last_login');
    addDefaultColumns(table);
  });

  const country = createNameTable(knex, tableNames.country);
  const item_type = createNameTable(knex, tableNames.item_type);
  const shape = createNameTable(knex, tableNames.shape);

  const inventory_location = knex.schema.createTable(tableNames.inventory_location, table => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    table.string('description', 1000);
    table.string('image_url', 2000);
    addDefaultColumns(table);
  });

  await Promise.all([
    user,
    item_type,
    country,
    shape,
    inventory_location
  ]);

  await knex.schema.createTable(tableNames.state, table => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    table.string('code');
    references(table, tableNames.country);
    addDefaultColumns(table);
  });

  await knex.schema.table(tableNames.country, table => {
    table.string('code');
  });

  await knex.schema.createTable(tableNames.address, table => {
    table.increments().notNullable();
    table.string('street_address_1', 50).notNullable();
    table.string('street_address_2', 50);
    table.string('city', 50).notNullable();
    table.string('zipcode', 15).notNullable();
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
    references(table, 'state');
  });

  await knex.schema.createTable(tableNames.company, table => {
    table.increments().notNullable();
    table.string('name').notNullable();
    url(table, 'logo_url');
    table.string('description', 1000);
    url(table, 'website_url');
    email(table, 'email');
    references(table, 'address');
  });
}

export async function down (knex: Knex): Promise<void> {
  await Promise.all([
    tableNames.company,
    tableNames.address,
    tableNames.user,
    tableNames.item_type,
    tableNames.country,
    tableNames.state,
    tableNames.shape,
    tableNames.inventory_location
  ].map((tableName) => knex.schema.dropTableIfExists(tableName)));
};
