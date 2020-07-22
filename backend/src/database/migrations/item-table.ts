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
  await knex.schema.table(tableNames.address, (table) => {
    table.dropColumn('country_id');
  });

  await knex.schema.table(tableNames.state, (table) => {
    table.string('code');
    references(table, tableNames.country);
  });

  await knex.schema.table(tableNames.country, (table) => {
    table.string('code');
  });

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
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table(tableNames.address, (table) => {
    references(table, tableNames.country);
  });

  await knex.schema.table(tableNames.state, (table) => {
    table.dropColumn('country_id');
  });

  await knex.schema.dropTable(tableNames.size);
}

