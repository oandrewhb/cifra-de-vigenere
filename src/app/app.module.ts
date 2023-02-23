import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { InicioComponent } from './inicio/inicio.component';
import { DocumentacaoComponent } from './documentacao/documentacao.component';
import { FormsModule } from '@angular/forms';
import { TextBlockComponent } from './text-block/text-block.component';
import { TabelaVigenereComponent } from './tabela-vigenere/tabela-vigenere.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    InicioComponent,
    DocumentacaoComponent,
    TextBlockComponent,
    TabelaVigenereComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
