import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Currency from '../app/models/Currency';
const models = [Currency];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

}
//TODO implement redis cache

export default new Database();
