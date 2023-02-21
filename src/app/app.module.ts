import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { InicioComponent } from './inicio/inicio.component';
import { DocumentacaoComponent } from './documentacao/documentacao.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    InicioComponent,
    DocumentacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
