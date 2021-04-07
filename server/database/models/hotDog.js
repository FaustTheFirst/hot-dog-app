import { Model, AjvValidator } from 'objection';

class HotDogModel extends Model {
  static get tableName() {
    return 'hotdogs';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'float' },
        imgURL: { type: 'string' }
      },
      additionalProperties: false
    };
  }

  static createValidator() {
    return new AjvValidator({
      onCreateAjv: () => {},
      options: {
        allErrors: true,
        validateSchema: false,
        ownProperties: true,
        v5: true
      }
    });
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

export default HotDogModel;
