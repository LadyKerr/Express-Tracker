// Update with your config settings.

const localPg = {
  host: 'localhost',
  database: 'tipsease',
  user: 'tester1',
  password: 'testing123',
  isServiceWorker: 0,
};
const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite
    connection: {
      filename: './data/expense-tracker.db3',
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  // staging: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // },

  // --------production environment used w/Heroku--------
  // production: {
  //   client: 'pg',
  //   connection: productionDbConnection,
  //   migrations: {
  //     directory: './database/migrations',
  //   },
  //   seeds: {
  //     directory: './database/seeds',
  //   },
  // },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // }
};
