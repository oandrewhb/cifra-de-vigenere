import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CifraComponent } from './pages/cifra/cifra.component';
import { ArtigoComponent } from './pages/artigo/artigo.component';
import { FormsModule } from '@angular/forms';
import { TextBlockComponent } from './components/text-block/text-block.component';
import { TabelaVigenereComponent } from './components/tabela-vigenere/tabela-vigenere.component';

@NgModule({
  declarations: [
    AppComponent,
    CifraComponent,
    ArtigoComponent,
    TextBlockComponent,
    TabelaVigenereComponent,
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
