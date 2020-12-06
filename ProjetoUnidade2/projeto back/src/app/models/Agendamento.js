import Sequelize, { Model } from 'sequelize';

class Agendamento extends Model {
  static init(sequelize) {
    super.init(
      {
        coordenador: Sequelize.STRING,
        assunto: Sequelize.STRING,
        descricao: Sequelize.STRING,
        data: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );
  }
}

export default Agendamento;
