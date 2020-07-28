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

export async function up(knex: Knex): Promise<void> {
  
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
  // let state = createNameTable(knex, tableNames.state); //→ fix here
  let shape = createNameTable(knex, tableNames.shape);

  let inventory_location = knex.schema.createTable(tableNames.inventory_location, (table: any) => {
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
    // state,
    shape,
    inventory_location,
  ]);  

  // Insert a row called code to the state table 
  // await knex.schema.table(tableNames.state, (table) => {
  //   table.string('code');
  //   references(table, tableNames.country, true); // → fix here
  // });

  await knex.schema.createTable(tableNames.state, (table: any) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    table.string('code');
    references(table, tableNames.country);
    addDefaultColumns(table);
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

  await knex.schema.createTable(tableNames.company, (table: any) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    url(table, 'logo_url');
    table.string('description', 1000);
    url(table, 'website_url');
    email(table, 'email');
    references(table, 'address'); 
  });
}

export async function down(knex: Knex): Promise<void> {
  await Promise.all([
    tableNames.company,
    tableNames.address,
    tableNames.user,
    tableNames.item_type,
    tableNames.country,
    tableNames.state,
    tableNames.shape,
    tableNames.inventory_location,
  ].map((tableName) => knex.schema.dropTable(tableName)));
};