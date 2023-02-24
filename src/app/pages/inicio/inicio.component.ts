import { Component } from '@angular/core';

import { CifraDeVigenereService } from '../../services/cifra-de-vigenete/cifra-de-vigenere.service';
import { copy } from 'clipboard';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  chave: string = "";
  texto: string = "";
  resultado: string = "";

  cifraDeVigenere: CifraDeVigenereService;

  constructor (cifraDeVigenere: CifraDeVigenereService) {
    this.cifraDeVigenere = cifraDeVigenere;
  }

  criptografar():void {
    this.resultado = this.cifraDeVigenere.cifrar(this.texto, this.chave);
  }
  descriptografar():void {
    this.resultado = this.cifraDeVigenere.decifrar(this.texto, this.chave);
  }

  copiarChave():void {
    copy(this.chave);
  }

  limpar() {
    this.chave = "";
    this.texto = "";
    this.resultado = "";
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