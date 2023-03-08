import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CifraComponent } from './pages/cifra/cifra.component';
import { ArtigoComponent } from './pages/artigo/artigo.component';
import { UpdatesComponent } from './pages/updates/updates.component';

const routes: Routes = [
  {path: '', component: CifraComponent},
  {path: 'artigo', component: ArtigoComponent},
  {path: 'updates', component: UpdatesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
