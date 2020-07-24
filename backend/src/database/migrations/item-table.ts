import Knex from 'knex';

import tableNames from '../../constants/tableNames';

import {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references
} from '../../../src/lib/tableUtils';

export async function up(knex: Knex): Promise<void> {

  await knex.schema.createTable(tableNames.size, (table) => {
    table.increments();
    table.string('name').notNullable();
    table.float('length');
    table.float('width');
    table.float('height');
    table.float('volume');
    references(table, tableNames.shape);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item, (table) => {
    table.increments();
    references(table, tableNames.user);
    table.string('name');
    references(table, tableNames.item_type);
    table.text('description');
    references(table, tableNames.manufacturer);
    references(table, tableNames.size);
    table.string('sku', 100);
    addDefaultColumns(table);
  });
}

export async function down(knex: Knex): Promise<void> {

  await knex.schema.dropTable(tableNames.size);
}

