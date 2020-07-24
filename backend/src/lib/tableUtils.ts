import Knex from 'knex';

export const addDefaultColumns = (table: any) => {
  table.timestamps(false, true);
  table.datetime('deleted_at');
}
// → fix here
export const createNameTable = (knex: Knex, table_name: any) => {
  return knex.schema.createTable(table_name, (table: any) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    addDefaultColumns(table);
  });
}

export const url = (table: any, columnName: any) => {
  table.string(columnName, 2000);
}

export const email = (table: any, columnName: any) => {
  return table.string(columnName, 254);
}
// → fix here
export const references = (table: any, tableName: any, notNullable: any = true) => {
  const definition = table
    .integer(`${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');
  
  if ( notNullable ) {
    definition.notNullable();
  }
}

// module.exports = {
//   addDefaultColumns,
//   createNameTable,
//   url,
//   email,
//   references,
// };