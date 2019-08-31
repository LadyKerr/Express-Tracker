exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("id"); //primary key
    tbl.string("username", 128).notNullable();
    tbl.string("password", 128).notNullable();
  });
};

exports.down = function(knex) {
  //drop tables in opposite order created
  return knex.schema.dropTableIfExists("users");
};
