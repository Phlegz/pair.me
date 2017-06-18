exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw('ALTER TABLE users ALTER COLUMN email DROP NOT NULL')
    .then(knex.raw('ALTER TABLE users ALTER COLUMN name DROP NOT NULL'))
    .then(knex.schema.table('users', function(table){
      table.integer('github_id');
      })
    )
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('ALTER TABLE users ALTER COLUMN email SET NOT NULL')
    .then(knex.raw('ALTER TABLE users ALTER COLUMN name SET NOT NULL'))
    .then(knex.schema.table('users', function(table){
      table.dropColumn('github_id');
      })
    )
  ])
};

