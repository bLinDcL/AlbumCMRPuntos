import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { BarcodeScanner }     from '@ionic-native/barcode-scanner/ngx';
import { LoginService }       from './../services/login.service';
import { LoadingController }  from '@ionic/angular';
import { Storage }            from '@ionic/storage';
@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  codigo_barra_fleje : any;
  codigo_barra_producto :any;
  lista_tareas:any;
  upc_consulta:any;
  constructor(private router :Router,
              private barcodeScanner :BarcodeScanner,
              private loginService : LoginService,
              private loadingController:LoadingController,
              private storage:Storage) {}

  ngOnInit() {
    this.storage.get('id_usuario').then((val) => {
      this.getTareas(val);
    });
    
  }

  async getTareas(id_usuario:any){ 
    const loading = await this.loadingController.create({
      message: 'Obteniendo Tareas para hoy !',
      spinner: 'crescent' 
    });
      await loading.present();
      this.loginService.getTareaByUsuario(id_usuario).subscribe((data)=> {
        //console.log('data=>Respuesta =  '+JSON.stringify(data['respuesta']));  
        this.lista_tareas = data['respuesta'];
        loading.dismiss();
      },(error)=>{
        loading.dismiss();
        console.error(error);
      });
  }

  async getUpcByProducto(id_producto:any){ 
    this.loginService.getUpcByProducto(id_producto).subscribe((data)=> {
      console.log('data=>Respuesta =  '+JSON.stringify(data['respuesta']));  

      this.upc_consulta = data['respuesta']['upc_producto'];
    },(error)=>{
      console.error(error);
    });  
  }

  goToSubTareas(id_usutar:any,id_prodtar:any,nivel_producto:any,id_producto:any,desc_producto:any){
    // goToSubTareas(item.id_usutar,item.id_prodtar,item.nivel_producto,item.id_producto)
    

    if(nivel_producto === 1){
      this.storage.set('id_usutar'      ,id_usutar);
      this.storage.set('id_prodtar'     ,id_prodtar);
      this.storage.set('nivel_producto' ,nivel_producto);
      this.storage.set('id_producto'    ,id_producto);
      this.storage.set('desc_producto'  ,desc_producto);

      this.loginService.getUpcByProducto(id_producto).subscribe((data)=> {
        //console.log('data=>Respuesta  upc_producto  =  '+JSON.stringify(data['respuesta'][0]['upc_producto'])); 
        this.upc_consulta = data['respuesta'][0]['upc_producto'];
        this.escanearCodigoBarraProducto(this.upc_consulta);
      },(error)=>{
        console.error(error);
      });    
    }else if(nivel_producto === 2){
      //getProductosByCategoria
      this.loginService.getProductosByCategoria(id_producto).subscribe((data)=> {
        console.log('getProductosByCategoria  =  '+JSON.stringify(data['respuesta'])); 
        //this.upc_consulta = data['respuesta'][0]['upc_producto'];
        //this.escanearCodigoBarraProducto(this.upc_consulta);
      },(error)=>{
        console.error(error);
      }); 
    }

    //this.router.navigate(['/subtareas',id_categoria]);
  }

  goToListaTareas(){
    this.router.navigateByUrl('/lista-tareas');
  }

  goToIngresarEvidencia(){
    //this.storage.set('id_usutar',id_usutar);
    //this.storage.set('item',item);
    this.router.navigate(['/ingresaInventario']);
  }

  escanearCodigoBarraProducto(upc_producto:any){
      this.barcodeScanner.scan().then(barcodeData => {
        this.codigo_barra_producto = barcodeData['text'];
          console.log('codigo_barra_producto = '+this.codigo_barra_producto+'    upc_producto = '+upc_producto);
          if(this.codigo_barra_producto == upc_producto){
            alert('Codigos Iguales !');
            this.goToIngresarEvidencia();
          }else{
            alert('Distintos !');
          }
      }).catch(err => {
        alert('Error  = '+ err);
      }); 
  }

  escanearCodigoBarra(){
    alert('Primero Escanear Fleje !');
    this.barcodeScanner.scan().then(barcodeData => {
        this.codigo_barra_fleje = barcodeData['text'];
        alert('Escanear Codigo barra producto ');
        this.barcodeScanner.scan().then(barcodeData => {
              this.codigo_barra_producto = barcodeData['text'];
              if(this.codigo_barra_fleje === this.codigo_barra_producto){
                  alert('Producto Corresponde a Fleje');
              }else{
                  alert('El Producto NO corresponde a Fleje !');
              }
        }).catch(err => {
              alert('Error  = '+ err);
        });
      }).catch(err => {
        alert('Error  = '+ err);
      });
  }

}
