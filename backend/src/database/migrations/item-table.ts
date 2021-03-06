import Knex from 'knex';

import tableNames from '../../constants/tableNames';

import {
  addDefaultColumns,
  url,
  references
} from '../../../src/lib/tableUtils';

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable(tableNames.size, (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('name').notNullable();
    table.float('length');
    table.float('width');
    table.float('height');
    table.float('volume');
    references(table, tableNames.shape);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item, (table:Knex.CreateTableBuilder) => {
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

  await knex.schema.createTable(tableNames.item_info, (table:Knex.CreateTableBuilder) => {
    table.increments();
    references(table, tableNames.user);
    references(table, tableNames.item);
    table.dateTime('purchase_date').notNullable();
    table.dateTime('expiration_date');
    references(table, tableNames.company, false, 'retailer');
    table.dateTime('last_used');
    table.float('purchase_price').notNullable().defaultTo(0);
    table.float('msrp').notNullable().defaultTo(0);
    references(table, tableNames.inventory_location);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.item_image, (table:Knex.CreateTableBuilder) => {
    table.increments();
    references(table, tableNames.item);
    url(table, 'image_url');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.related_item, (table:Knex.CreateTableBuilder) => {
    table.increments();
    references(table, tableNames.item);
    references(table, tableNames.item, false, 'related_item');
    addDefaultColumns(table);
  });
}

export async function down (knex: Knex): Promise<void> {
  await Promise.all([
    tableNames.size,
    tableNames.related_item,
    tableNames.item,
    tableNames.item_info,
    tableNames.item_image,
    tableNames.related_item
  ].reverse()
    .map(name => knex.schema.dropTableIfExists(name)));
}
