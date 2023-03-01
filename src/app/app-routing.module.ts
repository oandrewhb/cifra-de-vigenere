import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CifraComponent } from './pages/cifra/cifra.component';
import { ArtigoComponent } from './pages/artigo/artigo.component';

const routes: Routes = [
  {path: '', component: CifraComponent},
  {path: 'artigo', component: ArtigoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
