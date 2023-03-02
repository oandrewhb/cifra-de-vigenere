import { Component, Input } from '@angular/core';

@Component({
  selector: 'tabela-vigenere',
  templateUrl: './tabela-vigenere.component.html',
  styleUrls: ['./tabela-vigenere.component.scss']
})
export class TabelaVigenereComponent {

  @Input() flUsarTabela = 'Simples';

  tabelaSimples: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  tabelaCompleta: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()-_=+{}[],.<>:;/?' + '\\' + '|"' + "'";

  tabela: {[key: string]: string[][]} = {
    'Simples': [],
    'Completo': [],
  };

  constructor() {
    this.tabela['Simples'] = this.gerarTabela(this.tabelaSimples);
    this.tabela['Completo'] = this.gerarTabela(this.tabelaCompleta);
  }

  gerarTabela(tabela: string): string[][] {
    const tabelaGerada:string[][] = [];

    for(const iLinha in tabela.split('')) {
      const linhaArray: string[] = [];

      for(let letra = 0; letra < tabela.length; letra++) {
        const iLetra = (+iLinha + letra) % tabela.length;

        linhaArray.push(tabela[iLetra]);
      }

      tabelaGerada.push(linhaArray);
    }

    return tabelaGerada;
  }

}
