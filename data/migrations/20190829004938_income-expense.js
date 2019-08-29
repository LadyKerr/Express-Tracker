exports.up = function(knex) {
  return knex.schema
    .createTable("income", tbl => {
      tbl.increments();
      tbl
        .string("payor", 250)
        .notNullable()
        .unique();
      tbl.integer("amount").notNullable();
      //foreign key
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDELETE("RESTRICT");
    })
    .createTable("expenses", tbl => {
      tbl.increments();
      tbl.integer("amount").notNullable();
      tbl
        .string("category", 128)
        .notNullable()
        .unique();
      tbl.text("notes", 500);
      tbl.string("date").notNullable();
      tbl.boolean("paid").defaultTo("false");
      //foreign key
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDELETE("RESTRICT");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("expenses").dropTableIfExists("income");
};
