import { Component } from '@angular/core';

import { CifraDeVigenereService } from '../../services/cifra-de-vigenete/cifra-de-vigenere.service';
import { copy } from 'clipboard';

@Component({
  selector: 'app-cifra',
  templateUrl: './cifra.component.html',
  styleUrls: ['./cifra.component.scss']
})
export class CifraComponent {

  chave: string = "";
  texto: string = "";
  resultado: string = "";

  modoArray = ['Simples', 'Completa'];
  modoSelecionado: string = this.modoArray[1];

  cifraDeVigenere: CifraDeVigenereService;

  constructor (cifraDeVigenere: CifraDeVigenereService) {
    this.cifraDeVigenere = cifraDeVigenere;
  }

  criptografar():void {
    this.vigenere(true);
  }
  descriptografar():void {
    this.vigenere(false);
  }

  vigenere(cifrar: boolean): void {
    const response = this.cifraDeVigenere.vigenere(this.texto, this.chave, this.modoSelecionado, cifrar);

    if (response.mensagemErro) {
      alert(response.mensagemErro);
      return;
    }

    this.resultado = response.resultado;
    this.chave = response.chaveFormatada;
  }

  copiarChave():void {
    copy(this.chave);
  }

  limpar() {
    this.chave = "";
    this.texto = "";
    this.resultado = "";
    this.modoSelecionado = this.modoArray[1]
  }

  gerarChaveAleatoria = ():void => {this.chave = _gerarChaveAleatoria()};
}

function _gerarChaveAleatoria():string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const comprimento = 30;
  let chave = '';

  for (let i = 0; i < comprimento; i++) {
    let indice = Math.floor(Math.random() * caracteres.length);
    chave += caracteres.charAt(indice);
  }

  return chave;
}