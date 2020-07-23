// const Knex = require('knex');
import Knex from 'knex';

import tableNames from '../../constants/tableNames';
// const tableNames = require('../../constants/tableNames'); 
import {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references
} from '../../../src/lib/tableUtils';
// const { 
//   addDefaultColumns, 
//   createNameTable, 
//   url, 
//   email, 
//   references 
// } = require('../../src/lib/tableUtils');

export async function up(knex: Knex) {
  
  let user = knex.schema.createTable(tableNames.user, (table: any) => {
    table.increments().notNullable();
    email(table, 'email').notNullable().unique();
    table.string('name').notNullable();
    table.string('password', 127).notNullable();
    table.datetime('last_login');
    addDefaultColumns(table);
  });

  let country = createNameTable(knex, tableNames.country);
  let item_type = createNameTable(knex, tableNames.item_type);
  let state = createNameTable(knex, tableNames.state);
  let shape = createNameTable(knex, tableNames.shape);

  let location = knex.schema.createTable(tableNames.location, (table: any) => {
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
    state,
    shape,
    location,
  ]);  

  // Insert a row called code to the state table
  await knex.schema.table(tableNames.state, (table) => {
    table.string('code');
    references(table, tableNames.country);
  });

  // Insert a row called code to the country table
  await knex.schema.table(tableNames.country, (table) => {
    table.string('code');
  });

  await knex.schema.createTable(tableNames.address, (table: any) => {
    table.increments().notNullable();
    table.string('street_address_1', 50).notNullable();
    table.string('street_address_2', 50);
    table.string('city', 50).notNullable();
    table.string('zipcode', 15).notNullable();
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
    references(table, 'state');
    // references(table, 'country');
  });

  await knex.schema.createTable(tableNames.manufacturer, (table: any) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    url(table, 'logo_url');
    table.string('description', 1000);
    url(table, 'website_url');
    email(table, 'email');
    references(table, 'address'); 
  });

  // TODO: create the item table... cause that what its all about 
}

export async function down(knex: Knex) {
  await Promise.all([
    tableNames.manufacturer,
    tableNames.address,
    tableNames.user,
    tableNames.item_type,
    tableNames.country,
    tableNames.state,
    tableNames.shape,
    tableNames.location,
  ].map((tableName) => knex.schema.dropTable(tableName)));
};