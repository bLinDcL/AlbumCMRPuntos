import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IngresaInventarioPage } from './ingresa-inventario.page';

const routes: Routes = [
  {
    path: '',
    component: IngresaInventarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IngresaInventarioPage]
})
export class IngresaInventarioPageModule {}
