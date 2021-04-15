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
      required: ['name', 'price'],
      properties: {
        name: { type: 'string', minLength: 3, maxLength: 16 },
        description: {
          anyOf: [
            { type: 'string', maxLength: 64 },
            { type: 'null' }
          ]
        },
        price: { type: 'number', exclusiveMinimum: 0, maximum: 100 },
        imgURL: {
          anyOf: [
            { type: 'string', format: 'uri', maxLength: 128 },
            { type: 'null' }
          ]
        }
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
