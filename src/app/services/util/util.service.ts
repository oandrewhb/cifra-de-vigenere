import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  utilCache: {[key: string]: any} = {};

  constructor(private http: HttpClient) { }

  getUtilCache(index: string): any {
    let result = null;

    if (this.utilCache[index]) {
      result = this.utilCache[index];
    } else if (localStorage.getItem(index)) {
      result = JSON.parse(String(localStorage.getItem(index)));
    }

    return result;
  }
  setUtilCache(index: string, value: any): void {
    this.utilCache[index] = value;
    localStorage.setItem(index, JSON.stringify(value));
  }

  getProjectCommits(okFun?: (commits: commit[], lastLoad: string) => void, errFun?: (errMsg: string, gotCache: boolean) => void): void {
    const url = 'https://api.github.com/repos/andrewhermelino/cifra-de-vigenere/commits';
    this.getApi(url, (data: any) => {
      
      const commitsArray: commit[] = [];

      data.forEach((commit: any, index: number) => {
        commitsArray.push({
          index: index,
          version: `v1.${data.length - index - 1}.0`,
          dateStr: stringDate(commit.commit.committer.date),
          message: commit.commit.message,
          htmlUrl: commit.html_url,
        });
      })

      this.setUtilCache('commitsArray', commitsArray);
      this.setUtilCache('lastLoadCommitsArray', stringDate(new Date()));
      if (okFun) {
        okFun(commitsArray, '');
      }

    }, (err: any) => {
      if (this.getUtilCache('commitsArray')) { // Obtém updates do cache
        if (okFun) {
          okFun(this.getUtilCache('commitsArray'), this.getUtilCache('lastLoadCommitsArray') ?? 'Último carregado');
        }
        if (errFun) {
          errFun(err.message, true);
        }
      } else { // Caso não obteve updates do cache
        if (errFun) {
          errFun(err.message, false);
        }
      }
    });
  }

  getApi(url: string, okFun?: (data: any) => void, errFun?: (err: any) => void): void {
    this.http.get(url).subscribe(okFun, errFun);
  }

}

type commit = {
  index: number;
  version: string;
  dateStr: string;
  message: string;
  htmlUrl: string;
}

function stringDate(_date: any): string {
  try {
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
  } catch (e) {
    console.error(e);
    return '00 xxx, 00000 - 00:00:00';
  }
}