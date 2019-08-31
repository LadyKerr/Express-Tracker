exports.up = function(knex) {
  return knex.schema.createTable("expenses", tbl => {
    tbl
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();

    tbl.increments("id");
    tbl.integer("amount").notNullable();
    tbl
      .string("category", 128)
      .notNullable()
      .unique();
    tbl.text("notes", 500);
    tbl.string("date").notNullable();
    tbl.boolean("paid").defaultTo("false");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("expenses");
};
