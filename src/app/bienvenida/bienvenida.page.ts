import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Geolocation }        from '@ionic-native/geolocation/ngx';
import { Router }             from '@angular/router';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import {ActivatedRoute}       from '@angular/router';
import { LoginService }       from './../services/login.service';
import { Storage }            from '@ionic/storage';
import { LoadingController }  from '@ionic/angular';
declare var google:any;

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})

  

export class BienvenidaPage implements OnInit {
  @ViewChild('map', {static: false}) mapElement: ElementRef; 
  map: any;
  address:string;
  datos   = null;
  usuario = null;
  contador = 0;
  id_usuario :any;
  constructor(private geolocation:Geolocation,
              private router :Router,
              private nativeGeocoder: NativeGeocoder,
              private activatedroute: ActivatedRoute,
              private loginService:LoginService,
              private storage:Storage,
              private loadingController:LoadingController,
              ) {}

  info = {latitude:0,longitude:0};
  
  ngOnInit() {
    this.loadMap();
    this.datos = this.activatedroute.snapshot.paramMap.get('datos');
    this.cargarDatos(this.datos);
  }

  async getUbicacionByUsuario(direccion:any){
    const parametros = direccion.toString()+';'+this.id_usuario;
    this.loginService.getUbicacionByUsuario(parametros).subscribe((data)=> {
      if(data['respuesta'] === false){
        alert('Usted NO esta en algun local asociado !');
      }else{
        console.log('data["local"]  = '+JSON.stringify(data['local']));
        this.storage.set('id_local',data['local']['id_local']);
      }
    },(error)=>{
      console.error(error);
    }); 
  }

  cargarDatos(datos:any){
    var var_split   = datos.split(';');
    this.usuario    = var_split[0];
    this.id_usuario = var_split[1];
  }

  async loadMap() {
    
    this.geolocation.getCurrentPosition().then((resp) => {
      //console.log('getCurrentPosition  = '+JSON.stringify(resp));
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      //console.log('Error getting location', error);
    });
  }
 
  async getAddressFromCoords(lattitude, longitude) {
    //console.log("getAddressFromCoords "+lattitude+" "+longitude);

    const loading = await this.loadingController.create({
      message: 'Obteniendo Ubicacion !...',
      spinner: 'crescent'
    });
    await loading.present();
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
 
  this.nativeGeocoder.reverseGeocode(lattitude, longitude, options).then((result: NativeGeocoderReverseResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);
        }
          responseAddress.reverse();
        for (let value of responseAddress) {
          if(this.contador !== 0 && this.contador !== 7 && this.contador !==8 ){
              this.address += value+", ";
          }
          
          this.contador++;
        }
          this.address = this.address.slice(0, -2);
          this.getUbicacionByUsuario(responseAddress);
          loading.dismiss();
      })
      .catch((error: any) =>{ 
        loading.dismiss();
        this.address = "No lo podemos ubicar ! , Revise si esta encendida su ubicacion !";
      });
  }

  getLocalicacion(){ 
    this.geolocation.getCurrentPosition().then((resp) => {
      //alert(JSON.stringify(resp.coords));
      this.info.latitude  = resp.coords.latitude;
      this.info.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  } 

  goToIngresarEvidencia(){
    this.router.navigateByUrl('/tareas');
  }
}
