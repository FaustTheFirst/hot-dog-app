export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  getAll() {
    return this.model.transaction(async trx => {
      const all = await this.model.query(trx).throwIfNotFound();

      return all;
    });
  }

  getById(id) {
    return this.model.transaction(async trx => {
      const one = await this.model.query(trx).findById(id).throwIfNotFound();

      return one;
    });
  }

  create(data) {
    return this.model.transaction(async trx => {
      const create = await this.model.query(trx).returning('*').insert(data);

      return create;
    });
  }

  updateById(id, data) {
    return this.model.transaction(async trx => {
      const update = await this.model
        .query(trx)
        .findById(id)
        .throwIfNotFound()
        .returning('*')
        .patch(data);

      return update;
    });
  }

  deleteById(id) {
    return this.model.transaction(async trx => {
      const remove = await this.model.query(trx).deleteById(id).throwIfNotFound();

      return remove;
    });
  }
}
