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

    const unicodeCodes: string[] = _getUnicodeCodes(resultado);
    if (unicodeCodes.length > 0) {
      for (const code of unicodeCodes) {
        const caractere = String.fromCodePoint(parseInt(code.slice(2), 16));

        resultado = resultado.replaceAll(code, caractere);
      }
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
    let formatado = param;

    for (const c of formatado) {
      if (tabela.indexOf(c) == -1) {

        const char: string = c;
        const codePoint: number | undefined = char.codePointAt(0);

        if (codePoint) {
          const codePointStr: string = codePoint.toString(16).toUpperCase();
  
          const code = `U+${codePointStr.padStart(5, "0")}`;
  
          formatado = formatado.replaceAll(c, code);
        }
      }
    }

    return formatado;
  }

}

function _getUnicodeCodes(str: string): string[] {
  const regex = /U\+[0-9A-Fa-f]{4,5}/g;
  const matches = str.match(regex);

  return matches ? matches : [];
}