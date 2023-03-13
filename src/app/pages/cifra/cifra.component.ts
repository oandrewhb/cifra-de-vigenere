import { Component } from '@angular/core';

import { CifraDeVigenereService } from '../../services/cifra-de-vigenete/cifra-de-vigenere.service';
import { copy } from 'clipboard';
import { HttpClient } from '@angular/common/http';

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

  waringAlerts: string[] = [];
  dangerAlerts: string[] = [];
  infoAlerts: string[] = [];

  constructor (private cifraDeVigenere: CifraDeVigenereService, private http: HttpClient) { }

  criptografar():void {
    this.vigenere(true);
  }
  descriptografar():void {
    this.vigenere(false);
  }

  vigenere(cifrar: boolean): void {
    this.waringAlerts = [];
    this.dangerAlerts = [];

    const response = this.cifraDeVigenere.vigenere(this.mensagem, this.chave, this.modoSelecionado, cifrar);

    this.waringAlerts = response.warningAlerts;
    this.dangerAlerts = response.dangerAlerts;
    this.infoAlerts = response.infoAlerts;

    if (this.dangerAlerts.length) {
      this.resultado = "";
      return;
    }

    this.resultado = response.resultado;
    this.chave = response.chaveFormatada;

  }

  closeAlert(alertMsg: string):void {
    this.waringAlerts = this.waringAlerts.filter(alert => alert != alertMsg);
    this.dangerAlerts = this.dangerAlerts.filter(alert => alert != alertMsg);
    this.infoAlerts = this.infoAlerts.filter(alert => alert != alertMsg);
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

    this.waringAlerts = [];
    this.dangerAlerts = [];
    this.infoAlerts = [];
  }

  gerarChaveAleatoria():void {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const comprimento = 30;
    let chave = '';
  
    for (let i = 0; i < comprimento; i++) {
      let indice = Math.floor(Math.random() * caracteres.length);
      chave += caracteres.charAt(indice);
    }
  
    this.chave = chave;
  }

  gerarChaveComPalavraAleatoria():void {
    this.http.get('https://api.dicionario-aberto.net/random').subscribe((data: any) => {
      this.chave = data.word;
    });
  }

  gerarChaveComFraseAleatoria():void {
    this.http.get('https://type.fit/api/quotes').subscribe((data: any) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const frase = data[randomIndex].text;

      this.chave = frase;
    });
  }
}