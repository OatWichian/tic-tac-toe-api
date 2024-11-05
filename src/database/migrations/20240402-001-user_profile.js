exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('user_profile', function (table) {
      table.bigIncrements('id').unique();
      table.uuid('uuid').index().unique();
      table.timestamps();
      table.integer('status').defaultTo(1);
      table.string('firebase_id').index().unique();
      table.string('first_name');
      table.string('last_name');
      table.text('image_url');
      table.string('email');
      table.integer('win_continuous').defaultTo(0);
      table.integer('total_score').defaultTo(0);
    }),
  ]);
};
exports.down = function (knex) {
  return Promise.all([]);
};
