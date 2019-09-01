exports.up = function(knex) {
  return knex.schema.table("users", tbl => {
    tbl.string("first_name", 250);
    tbl.string("last_name");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
