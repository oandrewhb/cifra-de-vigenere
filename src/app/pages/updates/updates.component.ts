import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent {

  commitsArray: commit[] = [];
  errorMsg: string = '';

  constructor(private http: HttpClient) {
    this.http.get('https://api.github.com/repos/andrewhermelino/cifra-de-vigenere/commits').subscribe((data: any) => {

      const commitsArray = data;

      commitsArray.forEach((commit: any, index: number) => {
        const versao = commitsArray.length - index - 1;
        const data = stringDate(commit.commit.committer.date);
        const menssagem = commit.commit.message;
        const link = commit.html_url;

        this.commitsArray.push({
          versao: `v1.${versao}.0`,
          data: data,
          menssagem: menssagem,
          link: link,
          indice: index,
        });
      })

    }, (err: any) => {
      this.errorMsg = err.message;
      console.error(err);
    });
  }

}

type commit = {
  versao: string;
  data: string;
  menssagem: string;
  link: string;
  indice: number;
}

function stringDate(_date: Date): string {
  const date = new Date(_date);

  const dia  = date.getDate().toString();
  const diaF = (dia.length == 1) ? '0'+dia : dia;
  const mes  = (date.getMonth()+1).toString();
  const mesF = (mes.length == 1) ? '0'+mes : mes;
  const anoF = date.getFullYear();

  const hora = date.getHours().toString();
  const horaF = (hora.length == 1) ? '0'+hora : hora;
  const minutos = date.getMinutes().toString();
  const minutosF = (minutos.length == 1) ? '0'+minutos : minutos;
  const segundos = date.getSeconds().toString();
  const segundosF = (segundos.length == 1) ? '0'+segundos : segundos;

  const nomeMes: {[key: string]: string} = {
    '01': 'jan',
    '02': 'fev',
    '03': 'mar',
    '04': 'abr',
    '05': 'mai',
    '06': 'jun',
    '07': 'jul',
    '08': 'ago',
    '09': 'set',
    '10': 'out',
    '11': 'nov',
    '12': 'dez',
  }

  return `${diaF} ${nomeMes[mesF]}, ${anoF} - ${horaF}:${minutosF}:${segundosF}`;
}