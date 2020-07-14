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

/**
 * @param {Knex} knex
 */
export async function up(knex: typeof Knex) {
  
  let user = knex.schema.createTable(tableNames.user, (table: any) => {
    table.increments().notNullable();
    table.string('email', 254).notNullable().unique();
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
}

export async function down(knex: typeof Knex) {
  // let user = tableNames.user;
  // let item_type = tableNames.item_type;
  // let country = tableNames.country;
  // let state = tableNames.state;
  // let shape = tableNames.shape;
  // let location = tableNames.location;

  await Promise.all([
    tableNames.user,
    tableNames.item_type,
    tableNames.country,
    tableNames.state,
    tableNames.shape,
    tableNames.location,
  ].map((tableName) => knex.schema.dropTable(tableName)));
};