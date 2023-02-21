import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { DocumentacaoComponent } from './documentacao/documentacao.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'documentacao', component: DocumentacaoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
