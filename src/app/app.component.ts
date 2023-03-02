import { Component } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cifra De Vigenère';

  currentRoute: string = "";

  constructor(private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;

        if (this.currentRoute.includes('/artigo')) {
          this.titleService.setTitle(`${this.title} | Artigo`);
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
            '': '',
          };

          this.titleService.setTitle(this.titleService.getTitle() + topicoFormatado[topico]);

        }

      }
    });
  }

}
