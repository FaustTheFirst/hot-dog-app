import { Router } from 'express';
import {
  addHotDog,
  changeHotDog,
  getAllHotDogs,
  getHotDog,
  removeHotDog
} from '../services/hotDogService.js';

const router = Router();

router
  .get('/', (req, res, next) => getAllHotDogs()
    .then(payload => res.status(200).send(payload))
    .catch(next))
  .get('/:id', (req, res, next) => getHotDog(req.params.id)
    .then(payload => res.status(200).send(payload))
    .catch(next))
  .post('/', (req, res, next) => addHotDog(req.body)
    .then(payload => res.status(200).send(payload))
    .catch(next))
  .put('/:id', (req, res, next) => changeHotDog(req.params.id, req.body)
    .then(payload => res.status(200).send(payload))
    .catch(next))
  .delete('/:id', (req, res, next) => removeHotDog(req.params.id)
    .then(() => res.status(200).send({ success: true }))
    .catch(next));

export default router;
