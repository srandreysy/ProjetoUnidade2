import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Agendamento } from '../models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  url = 'http://localhost:3333/agendamento'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os Agendamentoros
  getAgendamentos(): Observable<Agendamento[]> {
    return this.httpClient.get<Agendamento[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Agendamentoro pelo id
  getAgendamentoById(id: number): Observable<Agendamento> {
    return this.httpClient.get<Agendamento>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Agendamentoro
  saveAgendamento(Agendamento: Agendamento): Observable<Agendamento> {
    return this.httpClient.post<Agendamento>(this.url, JSON.stringify(Agendamento), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Agendamentoro
  updateAgendamento(Agendamento: Agendamento): Observable<Agendamento> {
    return this.httpClient.put<Agendamento>(this.url + '/' + Agendamento.id, JSON.stringify(Agendamento), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Agendamentoro
  deleteAgendamento(Agendamento: Agendamento) {
    return this.httpClient.delete<Agendamento>(this.url + '/' + Agendamento.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}