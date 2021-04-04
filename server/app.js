import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { Model } from 'objection';
import cors from 'cors';
import Knex from 'knex';
import env from './env.js';
import knexConfig from '../knexfile.js';
import routes from './api/routes/index.js';
import TestModel from './database/models/index.js';

const app = express();

app.use(cors());

const knex = Knex(knexConfig);

Model.knex(knex);

routes(app);

app.get('/test', (req, res) => {
  TestModel.query()
    .then(elem => res.send(elem))
    .catch(err => res.send(err));
});

const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

const staticPath = path.resolve(`${dir}/../client/build`);
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.write(fs.readFileSync(`${dir}/../client/build/index.html`));
  res.end();
});

// eslint-disable-next-line no-console
app.listen(env.app.port, () => console.log(`Server good! Port: ${env.app.port}`));
