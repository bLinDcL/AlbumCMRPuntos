import { Component, OnInit }  from '@angular/core';
import {ActivatedRoute}       from '@angular/router';
import { LoginService }       from './../services/login.service';
import { LoadingController }  from '@ionic/angular';
import { Router }             from '@angular/router';
import { Storage }            from '@ionic/storage';

@Component({
  selector: 'app-subtareas',
  templateUrl: './subtareas.page.html',
  styleUrls: ['./subtareas.page.scss'],
}) 
export class SubtareasPage implements OnInit {
  id_tarea:any;
  lista_subtareas:any;
  id_usuario:any;
  id_categoria:any;
  constructor(private activatedroute:ActivatedRoute,
              private loginService : LoginService,
              private loadingController:LoadingController,
              private router:Router,
              private storage:Storage) { }

  ngOnInit() {
    this.id_categoria = this.activatedroute.snapshot.paramMap.get('id_categoria');
    this.getSkus(this.id_categoria);
  }

  /* async getSubTareas(id_tarea:any){
    const loading = await this.loadingController.create({
      message: 'Obteniendo Subtareas !',
      spinner: 'crescent'
    });
    await loading.present();
    this.loginService.getSubTareasByTarea(this.id_tarea).subscribe((data)=> {
      console.log('data = '+JSON.stringify(data));
      this.lista_subtareas = data['respuesta'];
    },(error)=>{
      console.error(error);
    });
      loading.dismiss();   
  } */

  async getSkus(id_categoria:any){
    const loading = await this.loadingController.create({
      message: "Obteniendo SKU'S !",
      spinner: 'crescent'
    });
    await loading.present();

    this.storage.get('id_usuario').then((id_usuario) => {
        this.id_usuario = id_usuario;
        let objeto = this.id_usuario+';'+id_categoria;
        this.loginService.getSkuCategoria(objeto).subscribe((data)=> {
          console.log('getSku = '+JSON.stringify(data));
          this.lista_subtareas = data['respuesta'];
        },(error)=>{
          console.error(error);
        });
        
        loading.dismiss();    
    });

  }
    
  goToIngresarEvidencia(item:any,id_usutar:any){
    this.storage.set('id_usutar',id_usutar);
    this.storage.set('item',item);
    this.router.navigate(['/ingresaInventario']);
  }

}
 