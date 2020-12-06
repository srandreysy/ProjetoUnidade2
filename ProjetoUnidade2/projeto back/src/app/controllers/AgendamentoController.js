import Agendamento from '../models/Agendamento';

class AgendamentoController {
  async store(req, res) {
    console.log(req.body)
    const {
      id,
      coordenador,
      assunto,
      descricao,
      data,
    } = await Agendamento.create(req.body);

    return res.json({
      id,
      coordenador,
      assunto,
      descricao,
      data,
    });
  }

  async index(req, res) {
    if (req.params.agendamentoId) {
      const Agendamento = await Agendamento.findOne({
        where: { id: req.params.agendamentoId },
      });

      return res.json({
        Agendamento,
      });
    }

    const Agendamentos = await Agendamento.findAll({
      order: ['id'],
    });
    return res.json(
      Agendamentos
    );
  }

  async update(req, res) {
    const agendamento = await Agendamento.findByPk(req.params.agendamentoId);

    const { 
      id,
      coordenador,
      assunto,
      descricao,
      data,
     } = await agendamento.update(req.body);

    return res.json({
      id,
      coordenador,
      assunto,
      descricao,
      data,
    });
  }

  async delete(req, res) {
    const agendamento_destroy = await Agendamento.findOne({
      where: {id: req.params.agendamentoId},
    });
    const agendamento = await agendamento_destroy.destroy();

    return res.json({ agendamento });
  }
   }

export default new AgendamentoController();
