import dotenv from 'dotenv';

dotenv.config();

const env = {
  app: {
    port: process.env.PORT
  },
  db: {
    database: process.env.RDS_DB_NAME,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT
  }
};

export default env;
