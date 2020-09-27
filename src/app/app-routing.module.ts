import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'preferencias', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'escaner', loadChildren: './ingresa-inventario/ingresa-inventario.module#IngresaInventarioPageModule' },
  { path: 'bienvenida/:datos', loadChildren: './bienvenida/bienvenida.module#BienvenidaPageModule' },
  { path: 'tareas', loadChildren: './tareas/tareas.module#TareasPageModule' },
  { path: 'misiones', loadChildren: './lista-tareas/lista-tareas.module#ListaTareasPageModule' },
  { path: 'subtareas/:id_categoria', loadChildren: './subtareas/subtareas.module#SubtareasPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
