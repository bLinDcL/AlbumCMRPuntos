import { Component, OnInit } from '@angular/core';
import { Camera , CameraOptions } from '@ionic-native/camera/ngx';
import { LoginService }           from './../services/login.service';
import {ActivatedRoute}           from '@angular/router';
import {LoadingController, AngularDelegate }       from '@ionic/angular';
import { Storage }                from '@ionic/storage';
import { BarcodeScanner }         from '@ionic-native/barcode-scanner/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-ingresa-inventario',
  templateUrl: './ingresa-inventario.page.html',
  styleUrls: ['./ingresa-inventario.page.scss'],
})
export class IngresaInventarioPage implements OnInit {
  image:String;
  imagenToServer:String;
  inventario = {fleje:false,quiebre:false,invasion:false};
  item:any;
  id_evidencia:any;
  lista_evidencias:any;
  fleje_producto:any = false;
  codigo_barra_fleje:any;
  codigo_barra_producto:any;
  desc_producto:any;
  
  comentario:any;  
  
  // NG IF
  verFleje:boolean          = false;
  verQuiebre:boolean        = false;
  verInvasion:boolean       = false;
  verCodigoBarra:boolean    = false;
  
  cadena_subtareas:any;

  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  
  constructor(private camera : Camera,
    private loginService : LoginService,
    private loadingController : LoadingController,
    //private activatedroute:ActivatedRoute,
    private storage : Storage,
    private barcodeScanner : BarcodeScanner,
    private geolocation : Geolocation
    ) {}
    
    
    ngOnInit() { 
      /* this.storage.get('desc_producto').then((item) => {
        console.log('desc_producto  = '+JSON.stringify(item));
        this.desc_producto = item;
        this.storage.get('id_prodtar').then((id_prodtar) => {
          this.getSubTareas(id_prodtar);
        });
      }); */
    }
    
    
    async getSubTareas(id_subtar:any){ 
      const loading = await this.loadingController.create({
        message: 'Obteniendo Subtareas !',
        spinner: 'crescent' 
      });
      await loading.present();
      this.loginService.getSubTareas(id_subtar).subscribe((data)=> {
        var largo =  Object.keys(data['respuesta']).length;
        for(var i=0;i< largo ; i++){
          if(data['respuesta'][i]['desc_subtarea'] == 'Quiebre'){
            this.verQuiebre = true;
          }else if(data['respuesta'][i]['desc_subtarea'] == 'Invasion'){
            this.verInvasion = true;
          }else if(data['respuesta'][i]['desc_subtarea'] == 'Codigo Barra'){
            this.verCodigoBarra = true;
          }else if(data['respuesta'][i]['desc_subtarea'] == 'Fleje'){
            this.verFleje = true;
          }
          
          if(i===0){
            this.cadena_subtareas = data['respuesta'][i]['id_subtarea'] +','+data['respuesta'][i]['desc_subtarea']; 
          }else{
            this.cadena_subtareas  = this.cadena_subtareas+';'+data['respuesta'][i]['id_subtarea'] +','+data['respuesta'][i]['desc_subtarea']; 
          }
          
        }
        loading.dismiss();
      },(error)=>{
        loading.dismiss();
        console.error(error);
      });
    }
    
    capturarImagen(){   
      const options: CameraOptions  = {
        quality         : 90 ,
        destinationType : this.camera.DestinationType.DATA_URL,
        encodingType    : this.camera.EncodingType.JPEG,
        mediaType       : this.camera.MediaType.PICTURE,
        sourceType      : this.camera.PictureSourceType.CAMERA,
        correctOrientation : true
      };
      
      this.camera.getPicture(options).then((ImagenData) =>{
        this.imagenToServer = ImagenData;
        this.image = 'data:image/jpeg;base64,'+ImagenData;
      },(error) => {
        console.log(error);
      });
      
    }
    
    async insertEvidencia(){
      const loading = await this.loadingController.create({
        message: 'Subiendo Evidencia ...',
        spinner: 'crescent'
      });
      await loading.present();
      let evidencia = null;
      this.storage.get('id_usutar').then((id_usutar) =>     {
        this.storage.get('id_prodtar').then((id_prodtar) =>  {
          this.storage.get('id_local').then((id_local)=>    {
            evidencia = {ID_LOCAL:id_local,ID_USUTAR:id_usutar,ID_PRODTAR:id_prodtar,IMAGEN:this.image,COMENTARIO:this.comentario,FLEJE:this.inventario.fleje,QUIEBRE:this.inventario.quiebre,INVASION:this.inventario.invasion,FLEJEPRODUCTO:this.fleje_producto,CADENA_SUBTAREAS:this.cadena_subtareas};
            this.loginService.insertEvidencia(evidencia).subscribe((data)=> {
              loading.dismiss();
              if(data['respuesta']['affectedRows'] === 1){
                alert('Evidencia Guardada ! ');
                this.limpiarInput();
              }else{
                alert('Error al guardar la evidencia !');
              }
            },(error)=>{
              console.error(error); 
            }); 
          });
        });
      });
    }
    
    limpiarInput(){
      this.inventario.fleje     = false;
      this.inventario.invasion  = false;
      this.inventario.quiebre   = false;
      this.image                = '';
      this.fleje_producto       = false;
    }
    
    separadorFuncion(funcion:any,id_evidencia:any){
      console.log('separadorFuncion !  la funcion es = '+funcion);
      
      if(funcion === "capturarImagen()"){
        this.capturarImagen();
      }else if(funcion === "saltar()"){
        
      }else if(funcion === "listo()"){
        
      }
      
    }
    
    async getEvidenciasBySubTarea(id_subtarea:any){
      const loading = await this.loadingController.create({
        message: 'Obteniendo Acciones !',
        spinner: 'dots'
      });
      await loading.present();
      this.loginService.getEvidenciasBySubTarea(id_subtarea).subscribe((data)=> {
        console.log('data = '+JSON.stringify(data));
        this.lista_evidencias = data['respuesta'];
      },(error)=>{
        console.error(error);
      });
      loading.dismiss();   
    }  
    
    escanearCodigoBarra(){
      this.getCurrentCoordinates();
      this.getPicture();
      // this.barcodeScanner.scan().then(barcodeData => {
      //   this.codigo_barra_fleje = barcodeData['text'];
      //   alert('Escanear Codigo barra producto ');
      //   this.barcodeScanner.scan().then(barcodeData => {
      //     this.codigo_barra_producto = barcodeData['text'];
      //     if(this.codigo_barra_fleje === this.codigo_barra_producto){
      //       this.fleje_producto = true;
      //       alert('Producto Corresponde a Fleje');
      //     }else{
      //       this.fleje_producto = false;
      //       alert('El Producto NO corresponde a Fleje !');
      //     }
      //   }).catch(err => {
      //     alert('Error 1 = '+ err);
      //   });
      // }).catch(err => {
      //   alert('Error 2 = '+ err);
      // });
    }
    
    cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
     }
  
    // use geolocation to get user's device coordinates
    getCurrentCoordinates() {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        console.log(this.latitude);
        console.log(this.longitude);
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    }
    
    getPicture(){
      this.camera.getPicture(this.cameraOptions).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
          console.log('Error ', err);
        });
    }
    
  }
  