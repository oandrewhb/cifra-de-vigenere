import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  chave: string = "";
  texto: string = "";
  resultado: string = "";

  criptografar():void {
    this.resultado = this.texto;
  }
  descriptografar():void {
    this.resultado = this.texto;
  }

  limpar() {
    this.chave = "";
    this.texto = "";
    this.resultado = "";
  }

  gerarChaveAleatoria = ():void => {this.chave = _gerarChaveAleatoria()};
  gerarChaveComPalavraAleatoria = ():void => {this.chave = _gerarChaveComPalavraAleatoria()};
}

function _gerarChaveAleatoria():string {
  return "gdsrgahutth";
}

function _gerarChaveComPalavraAleatoria():string {
  return "LIMAO";
}