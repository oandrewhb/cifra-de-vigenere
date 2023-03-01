import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CifraDeVigenereService {

  tabelaSimples: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  tabelaCompleta: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()-_=+{}[],.<>:;/?' + '\\' + '|"' + "'";
  tabela: {[key: string]: string} = {
    'Simples': this.tabelaSimples,
    'Completa': this.tabelaCompleta,
  };

  cifrar = (mensagem: string, chave: string, modo: string) => this.vigenere(mensagem, chave, modo, true);
  decifrar = (mensagem: string, chave: string, modo: string) => this.vigenere(mensagem, chave, modo, false);

  vigenere(mensagem:string, chave:string, modo: string, cifrar:boolean):string {
    const tabela = this.tabela[modo];

    mensagem = this.formatar(mensagem, modo);
    chave = this.formatar(chave.replaceAll(' ', ''), modo);
    
    while (chave.length < mensagem.length) {
      chave += chave;
    }

    let resultado = "";
    
    let iChave = 0;
    for (const i in mensagem.split('')) {
      if (mensagem[i] == ' ' && modo == 'Simples') {
        resultado += ' ';
        continue;
      }

      /* inicio - Cifrar e decifrar */
      const iAlfabetoMensagem = tabela.indexOf(mensagem[i]);
      const iAlfabetoChave = tabela.indexOf(chave[iChave]);
      let iCifrado:number;
      if (cifrar) {
        iCifrado = ( iAlfabetoMensagem + iAlfabetoChave ) % tabela.length;
      } else {
        iCifrado = ( iAlfabetoMensagem - iAlfabetoChave + tabela.length ) % tabela.length;
      }
      const letraCifrada = tabela[iCifrado];
      resultado += letraCifrada;
      /* fim - Cifrar e decifrar */

      iChave++
    }

    return resultado;
  }

  formatar(param:string, modo:string):string {
    const tabela = this.tabela[modo];

    let formatado = "erro";
    
    if (modo == 'Simples') {
      formatado = this.formatarSimples(param, tabela);
    }

    if (modo == 'Completa') {
      formatado = this.formatarCompleto(param, tabela);
    }

    return formatado;
  }

  formatarSimples(param:string, tabela: string):string {
    let formatado = param.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

    for (const c of formatado) {
      if (tabela.indexOf(c) == -1 && c != ' ') {
        formatado = formatado.replaceAll(c, '');
      }
    }

    return formatado;
  }

  formatarCompleto(param:string, tabela: string):string {
    let formatado = param.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    for (const c of formatado) {
      if (tabela.indexOf(c) == -1) {
        formatado = formatado.replaceAll(c, '');
      }
    }

    return formatado;
  }

}
