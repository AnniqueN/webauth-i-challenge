exports.seed = function(knex) {
  return knex('users').insert([
    {id: 1, username: 'AnniqueN', password: '$2y$08$dk9PA'},
    {id: 2, username: 'NikkiB', password: '$2y$08$dk9PA1234'},
    {id: 3, username: 'NylaG', password: '$2y$08$dk9PA4561'},
  ]);
  };