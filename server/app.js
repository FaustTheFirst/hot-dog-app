import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import objection from 'objection';
import cors from 'cors';
import Knex from 'knex';
import env from './env.js';
import knexConfig from '../knexfile.js';
import routes from './api/routes/index.js';
import logErrorsMiddleware from './api/middlewares/logErrorsMiddleware.js';
import validationErrorMiddleware from './api/middlewares/validationErrorMiddleware.js';
import constraintViolationErrorMiddleware from './api/middlewares/constraintViolationErrorMiddleware.js';
import notFoundErrorMiddleware from './api/middlewares/notFoundErrorMiddleware.js';
import dataErrorMiddleware from './api/middlewares/dataErrorMiddleware.js';
import dbErrorMiddleware from './api/middlewares/dbErrorMiddleware.js';
import errorHandlerMiddleware from './api/middlewares/errorHandlerMiddleware.js';

const app = express();

app.use(cors());

const { Model, knexIdentifierMapping } = objection;

const knex = Knex({
  ...knexConfig,
  ...knexIdentifierMapping({
    created_at: 'createdAt',
    updated_at: 'updatedAt'
  })
});

knex.migrate.latest({ ...knexConfig })
  // eslint-disable-next-line no-console
  .then(() => console.log('db migration complete'))
  // eslint-disable-next-line no-console
  .catch(err => console.log('Migration error:', err));

Model.knex(knex);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

const staticPath = path.resolve(`${dir}/../client/build`);
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.write(fs.readFileSync(`${dir}/../client/build/index.html`));
  res.end();
});

// Using error handling from https://vincit.github.io/objection.js/recipes/error-handling.html
app.use(
  logErrorsMiddleware,
  validationErrorMiddleware,
  constraintViolationErrorMiddleware,
  notFoundErrorMiddleware,
  dataErrorMiddleware,
  dbErrorMiddleware,
  errorHandlerMiddleware
);

// eslint-disable-next-line no-console
app.listen(env.app.port, () => console.log(`Server good! Port: ${env.app.port}`));
