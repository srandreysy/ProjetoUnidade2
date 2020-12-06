import Sequelize from 'sequelize';
import Agendamento from '../app/models/Agendamento';
import databaseConfig from '../config/database';

const models = [Agendamento];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    // .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
