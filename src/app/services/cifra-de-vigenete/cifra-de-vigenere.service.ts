import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CifraDeVigenereService {

  alfabetoParam: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  cifrar = (mensagem: string, chave: string) => this.vigenere(mensagem, chave, true);
  decifrar = (mensagem: string, chave: string) => this.vigenere(mensagem, chave, false);

  vigenere(mensagem:string, chave:string, cifrar:boolean):string {
    mensagem = this.formatar(mensagem);
    chave = this.formatar(chave.replaceAll(' ', ''));
    
    while (chave.length < mensagem.length) {
      chave += chave;
    }

    let resultado = "";
    
    let iChave = 0;
    for (const i in mensagem.split('')) {
      if (mensagem[i] == ' ') {
        resultado += ' ';
        continue;
      }

      /* CIFRAR / DECIFRAR */
      const iAlfabetoMensagem = this.alfabetoParam.indexOf(mensagem[i]);
      const iAlfabetoChave = this.alfabetoParam.indexOf(chave[iChave]);
      let iCifrado:number;
      if (cifrar) {
        iCifrado = ( iAlfabetoMensagem + iAlfabetoChave ) % this.alfabetoParam.length;
      } else {
        iCifrado = ( iAlfabetoMensagem - iAlfabetoChave + this.alfabetoParam.length ) % this.alfabetoParam.length;
      }
      const letraCifrada = this.alfabetoParam[iCifrado];
      resultado += letraCifrada;
      /* fim CIFRAR / DECIFRAR */

      iChave++
    }

    return resultado;
  }

  formatar(param:string):string {
    let formatado = param.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

    for (const c of formatado) {
      if (this.alfabetoParam.indexOf(c) == -1 && c != ' ') {
        formatado = formatado.replaceAll(c, '');
      }
    }

    return formatado;
  }

}
