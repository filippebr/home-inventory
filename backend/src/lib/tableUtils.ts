import Knex from 'knex';

export const addDefaultColumns = (table: Knex.CreateTableBuilder) => {
  table.timestamps(false, true);
  table.dateTime('deleted_at');
};

export const createNameTable = (knex: Knex, tableName: string) => {
  return knex.schema.createTable(tableName, (table: any) => {
    table.increments().notNullable();
    table.string('name').notNullable().unique();
    addDefaultColumns(table);
  });
};

export const url = (table: Knex.CreateTableBuilder, columnName: string) => {
  table.string(columnName, 2000);
};

export const email = (table: Knex.CreateTableBuilder, columnName: string) => {
  return table.string(columnName, 254);
};

export const references = (table: Knex.CreateTableBuilder, tableName: string, notNullable: any = true, columnName: string = '') => {
  const definition = table
    .integer(`${columnName || tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');

  if (notNullable) {
    definition.notNullable();
  }

  return definition;
};
