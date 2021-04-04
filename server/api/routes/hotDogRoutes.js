import { Router } from 'express';

const router = Router();

router
  .get('/', (req, res) => res.send('Get all hot dogs'))
  .get('/:id', (req, res) => res.send(`Get specific hot dog with id: ${req.params.id}`))
  .post('/', (req, res) => res.send(` Create hot dog with body: ${req.body}`))
  .put('/:id', (req, res) => res.send(`Change hot dog with id: ${req.params.id}; body: ${req.body}`))
  .delete('/:id', (req, res) => res.send(`Delete hot dog with id: ${req.params.id}`));

export default router;
