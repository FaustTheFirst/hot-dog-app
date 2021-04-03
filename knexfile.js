import env from './server/env.js';

export default {
  client: 'pg',
  connection: {
    database: env.db.database,
    user: env.db.username,
    password: env.db.password,
    host: env.db.host,
    port: env.db.port
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './server/database/migrations'
  }
};
