import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { DocumentacaoComponent } from './pages/documentacao/documentacao.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'documentacao', component: DocumentacaoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
