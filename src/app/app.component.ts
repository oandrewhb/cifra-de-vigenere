import { Component } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cifra De Vigenère';

  currentRoute: string = "";
  ultimaAtualizacao: string = "";
  linkUltimoCommit: string = "";
  versaoAtual: string = "";

  constructor(private router: Router, private titleService: Title, private http: HttpClient) {
    this.http.get('https://api.github.com/repos/andrewhermelino/cifra-de-vigenere/commits').subscribe((data: any) => {
      this.versaoAtual = (data.length-1).toString() ?? "";
      const ultimoCommit = data[0];

      this.linkUltimoCommit = ultimoCommit.html_url;

      const dataUltimaAtualizacao = new Date(ultimoCommit.commit.committer.date);

      this.ultimaAtualizacao = stringDate(dataUltimaAtualizacao);
    });
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;

        if (this.currentRoute.includes('/artigo')) {
          this.titleService.setTitle(`${this.title} | Artigo`);
        } else if (this.currentRoute.includes('/updates')) {
          this.titleService.setTitle(`${this.title} | Updates`);
        } else {
          this.titleService.setTitle(this.title);
        }

        if (this.currentRoute.includes('#')) {
          const topico: string = this.currentRoute.split('#')[1] ?? '';

          const topicoFormatado: {[key: string]: string} = {
            'oque-e-a-cifra-de-vigenere': ' - Oque é a cifra de Vigenère',
            'a-cifra-de-cesar': ' - A cifra de Vigenère',
            'cifra-de-vigenere-na-pratica': ' - Cifra de Vigenère na prática',
            'quem-foi-vigenere': ' - Quem foi Vigenère',
            'a-matematica-da-cifra-de-vigenere': ' - A matemática da cifra de Vigenère',

            'a-equacao-da-criptografia': ' - A equação da criptografia',
            'a-equacao-da-descriptografia': ' - A equação da descriptografia',
            '': '',
          };

          this.titleService.setTitle(this.titleService.getTitle() + topicoFormatado[topico]);

        } else {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 100);
        }

      }
    });
  }

}

function stringDate(date: Date): string {
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