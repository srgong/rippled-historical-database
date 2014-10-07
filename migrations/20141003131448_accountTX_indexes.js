'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('ledgers', function(table) {
      table.index(['ledger_index'], 'ledger_index_idx');
      table.index(['close_time'], 'close_time_idx');
    }),
    
    knex.schema.table('transactions', function(table) {
      table.index(['executed_time'], 'executed_time_idx');
      table.index(['ledger_id'], 'tx_ledger_id_idx');
      table.index(['ledger_index'], 'tx_ledger_index_idx');
      table.index(['tx_result'], 'tx_result_idx');
      table.index(['tx_type'], 'tx_type_idx');
    }),
    
    knex.schema.table('account_transactions', function(table) {
      table.index(['account_id', 'tx_id'], 'account_tx_idx');
      table.index(['account'], 'account_idx');
      table.index(['tx_hash'], 'tx_hash_idx');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('drop index if exists "close_time_idx"'),
    knex.raw('drop index if exists "ledger_index_idx"'),
    knex.raw('drop index if exists "executed_time_idx"'),
    knex.raw('drop index if exists "tx_ledger_id_idx"'), 
    knex.raw('drop index if exists "tx_ledger_index_idx"'),    
    knex.raw('drop index if exists "tx_type_idx"'),
    knex.raw('drop index if exists "tx_result_idx"'),
    knex.raw('drop index if exists "acccount_tx_idx"'),
    knex.raw('drop index if exists "acccount_idx"'),
    knex.raw('drop index if exists "tx_hash_idx"')
  ]); 
};