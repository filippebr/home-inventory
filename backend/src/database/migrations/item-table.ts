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
    references(table, tableNames.company);
    references(table, tableNames.size);
    table.string('sku', 42);
    table.boolean('sparks_joy').defaultTo(true);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item_info, (table) => {
    table.increments();
    references(table, tableNames.user);
    references(table, tableNames.item);
    table.dateTime('purchase_date').notNullable();
    table.dateTime('expiration_date');
    references(table, tableNames.company, false, 'retailer');
    table.dateTime('last_used');
    table.float('price').notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableNames.size);
}

