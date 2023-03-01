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

  modoArray = ['Simples', 'Completa'];
  modoSelecionado: string = this.modoArray[0];

  cifraDeVigenere: CifraDeVigenereService;

  constructor (cifraDeVigenere: CifraDeVigenereService) {
    this.cifraDeVigenere = cifraDeVigenere;
  }

  criptografar():void {
    this.resultado = this.cifraDeVigenere.cifrar(this.texto, this.chave, this.modoSelecionado);
  }
  descriptografar():void {
    this.resultado = this.cifraDeVigenere.decifrar(this.texto, this.chave, this.modoSelecionado);
  }

  copiarChave():void {
    copy(this.chave);
  }

  limpar() {
    this.chave = "";
    this.texto = "";
    this.resultado = "";
    this.modoSelecionado = this.modoArray[0]
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