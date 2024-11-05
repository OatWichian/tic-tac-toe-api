exports.up = function (knex) {
  return Promise.all([
    knex.schema
      .createTable('game_master', function (table) {
        table.bigIncrements('id').unique();
        table.uuid('uuid').index().unique();
        table.timestamps();
        table.integer('status').defaultTo(1);
        table.string('name');
        table.integer('win_score').defaultTo(1);
        table.integer('lost_score').defaultTo(1);
        table.integer('special_score').defaultTo(1);
        table.integer('win_continuous').defaultTo(1);
      })
      .then(() => {
        return knex('game_master').insert([
          {
            uuid: '123e4567-e89b-12d3-a456-426614174000',
            name: 'TicTacToe',
            win_score: 1,
            lost_score: -1,
            special_score: 1,
            win_continuous: 3,
            status: 1,
            created_at: knex.fn.now(),
            updated_at: knex.fn.now(),
          },
        ]);
      }),
    ,
  ]);
};
exports.down = function (knex) {
  return Promise.all([]);
};
