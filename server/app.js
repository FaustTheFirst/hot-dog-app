import express from 'express';
import { Model } from 'objection';
import Knex from 'knex';
import env from './env.js';
import knexConfig from '../knexfile.js';
import TestModel from './database/models/index.js';

const app = express();

const knex = Knex(knexConfig);

Model.knex(knex);

app.get('*', (req, res) => {
  TestModel.query()
    .then(elem => res.send(elem))
    .catch(err => res.send(err));
});

// eslint-disable-next-line no-console
app.listen(env.app.port, () => console.log(`Server good! Port: ${env.app.port}`));
