import { Component } from '@angular/core';

@Component({
  selector: 'tabela-vigenere',
  templateUrl: './tabela-vigenere.component.html',
  styleUrls: ['./tabela-vigenere.component.scss']
})
export class TabelaVigenereComponent {

  alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  tabela: string[][];

  constructor() {
    const tabela:string[][] = [];

    for(const iLinha in this.alfabeto.split('')) {
      const linhaArray: string[] = [];

      for(let letra = 0; letra < this.alfabeto.length; letra++) {
        const iLetra = (+iLinha + letra) % this.alfabeto.length;

        linhaArray.push(this.alfabeto[iLetra]);
      }

      tabela.push(linhaArray);
    }

    this.tabela = tabela;
  }

}
