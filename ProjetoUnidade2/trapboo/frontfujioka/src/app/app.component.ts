import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from './services/agendamento.service';
import { Agendamento } from './models/agendamento';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  agendamento = {} as Agendamento;
  agendamentos: Agendamento[] = [];

  constructor(private agendamentoService: AgendamentoService) {}
  
  ngOnInit() {
    this.getAgendamentos();
  }

  // defini se um carro será criado ou atualizado
  saveAgendamento(form: NgForm) {
    if (this.agendamento.id !== undefined) {
      this.agendamentoService.updateAgendamento(this.agendamento).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.agendamentoService.saveAgendamento(this.agendamento).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os carros
  getAgendamentos() {
    this.agendamentoService.getAgendamentos().subscribe((Agendamento: Agendamento[]) => {
      this.agendamentos = Agendamento;
      console.log(Agendamento);
    });
  }

  // deleta um carro
  deleteAgendamento(agendamento: Agendamento) {
    this.agendamentoService.deleteAgendamento(agendamento).subscribe(() => {
      this.getAgendamentos();
    });
  }

  // copia o carro para ser editado.
  editAgendamento(Agendamento: Agendamento) {
    this.agendamento = { ...Agendamento };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getAgendamentos();
    form.resetForm();
    this.agendamento = {} as Agendamento;
  }

}