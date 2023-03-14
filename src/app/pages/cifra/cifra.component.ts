import { Component } from '@angular/core';

import { CifraDeVigenereService } from '../../services/cifra-de-vigenere/cifra-de-vigenere.service';
import { UtilService } from 'src/app/services/util/util.service';
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

  waringAlerts: string[] = [];
  dangerAlerts: string[] = [];
  infoAlerts: string[] = [];

  constructor (private cifraDeVigenere: CifraDeVigenereService, private util: UtilService) {
    this.chave = util.getUtilCache('chave') ?? "";
    this.mensagem = util.getUtilCache('mensagem') ?? "";
  }

  onChangeChave():void {
    this.util.setUtilCache('chave', this.chave);
  }
  onChangeMensagem():void {
    this.util.setUtilCache('mensagem', this.mensagem);
  }

  criptografar():void {
    this.vigenere(true);
  }
  descriptografar():void {
    this.vigenere(false);
  }

  vigenere(cifrar: boolean): void {
    this.waringAlerts = [];
    this.dangerAlerts = [];

    this.util.setUtilCache('chave', this.chave);
    this.util.setUtilCache('mensagem', this.mensagem);

    if (this.chave.trim().length == 0 || this.chave.trim().length == 0) {
      this.dangerAlerts.push('Informe uma chave e uma mensagem.');
      return;
    }

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

    this.util.setUtilCache('chave', this.chave);
    this.util.setUtilCache('mensagem', this.mensagem);
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
    this.util.getApi('https://api.dicionario-aberto.net/random', (data) => {
      this.chave = data.word;
    })
  }

  gerarChaveComFraseAleatoria():void {
    this.util.getApi('https://type.fit/api/quotes', (data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const frase = data[randomIndex].text;

      this.chave = frase;
    })
  }
}