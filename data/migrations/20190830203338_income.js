exports.up = function(knex) {
  return knex.schema.createTable("income", tbl => {
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
  return knex.schema.dropTableIfExists("income");
};
