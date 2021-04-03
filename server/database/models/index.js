import { Model } from 'objection';

class TestModel extends Model {
  static get tableName() {
    return 'testModel';
  }
}

export default TestModel;
