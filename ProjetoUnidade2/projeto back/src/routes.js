import { Router } from 'express';

import AgendamentoController from './app/controllers/AgendamentoController';

const routes = new Router();

routes.post('/agendamento', AgendamentoController.store);
routes.get('/agendamento', AgendamentoController.index);
routes.put('/agendamento/:agendamentoId', AgendamentoController.update);
routes.delete('/agendamento/:agendamentoId', AgendamentoController.delete);
// routes.get('/agendamento/:agendamentoId', AgendamentoController.index);

export default routes;
