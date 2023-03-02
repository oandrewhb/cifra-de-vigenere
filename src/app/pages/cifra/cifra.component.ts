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
  mensagem: string = "";
  resultado: string = "";

  modoArray = ['Simples', 'Completo'];
  modoSelecionado: string = this.modoArray[1];

  constructor (
    private cifraDeVigenere: CifraDeVigenereService,
  ) { }

  criptografar():void {
    this.vigenere(true);
  }
  descriptografar():void {
    this.vigenere(false);
  }

  vigenere(cifrar: boolean): void {
    const response = this.cifraDeVigenere.vigenere(this.mensagem, this.chave, this.modoSelecionado, cifrar);

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

  colarTexto():void {
    navigator['clipboard'].readText().then((data) => {
      this.mensagem = data;
    });
  }

  limpar() {
    this.chave = "";
    this.mensagem = "";
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