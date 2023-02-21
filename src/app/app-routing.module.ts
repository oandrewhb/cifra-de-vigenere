import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrimeiraPaginaComponent } from './primeira-pagina/primeira-pagina.component';
import { SegundaPaginaComponent } from './segunda-pagina/segunda-pagina.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'primeira-pagina', component: PrimeiraPaginaComponent},
  {path: 'segunda-pagina', component: SegundaPaginaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
