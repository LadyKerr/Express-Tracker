exports.up = function(knex) {
  knex.schema.createTable("income", tbl => {
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();

    tbl.increments();
    tbl
      .string("payor", 250)
      .notNullable()
      .unique();
    tbl.integer("amount").notNullable();
  });
};

exports.down = function(knex) {
  return dropTableIfExists("income");
};
