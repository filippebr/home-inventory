// import Knex from 'knex';
const Knex = require('knex');

const tableNames = require('../../constants/tableNames');  

const addDefaultColumns = (table: any) => {
  table.timestamps(false, true);
  table.datetime('deleted_at');
}

const createNameTable = (knex: typeof Knex, table_name: any) => {
  return knex.schema.createTable(table_name, (table: any) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    addDefaultColumns(table);
  });
}

const url = (table: any, columnName: any) => {
  table.string(columnName, 2000);
}

const email = (table: any, columnName: any) => {
  return table.string(columnName, 254);
}

const references = (table: any, tableName: any) => {
  table
    .integer(`${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName);
}

/**
 * @param {Knex} knex
 */
export async function up(knex: typeof Knex) {
  
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

  // let address = knex.schema.createTable(tableNames.address, (table: any) => {
  //   table.increments().notNullable();
  //   table.string('street_address_1', 50).notNullable();
  //   table.string('street_address_2', 50);
  //   table.string('city', 50).notNullable();
  //   table.string('zipcode', 15).notNullable();
  //   table.float('latitude').notNullable();
  //   table.float('longitude').notNullable();
  //   references(table, 'state');
  //   references(table, 'country');
  // });

  await Promise.all([
    user,
    item_type,
    country,
    state,
    shape,
    location,
  ]);  

  await knex.schema.createTable(tableNames.address, (table: any) => {
    table.increments().notNullable();
    table.string('street_address_1', 50).notNullable();
    table.string('street_address_2', 50);
    table.string('city', 50).notNullable();
    table.string('zipcode', 15).notNullable();
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
    references(table, 'state');
    references(table, 'country');
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
}

export async function down(knex: typeof Knex) {
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