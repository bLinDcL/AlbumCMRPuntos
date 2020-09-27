import { Component, OnInit }      from '@angular/core';
import { Camera , CameraOptions } from '@ionic-native/camera/ngx';
import { LoginService }           from './../services/login.service';
import { Router }                 from '@angular/router';
import { Sim }                    from '@ionic-native/sim/ngx';
import { LoadingController }      from '@ionic/angular';
import { Storage }                from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  ngOnInit() {
    this.obtenerPermisos();
  }

  image:String;
  info:any;
  constructor(
    private camera:Camera,
    private loginService : LoginService,
    private router: Router,
    private sim:Sim,
    private loadingController:LoadingController,
    private storage:Storage
  ) {}

  todo = {usuario:'',pass:''};
  
  async obtenerPermisos(){
    const loading = await this.loadingController.create({
      message: 'Obteniendo Permisos...',
      spinner: 'crescent'
    });
    await loading.present();
    this.sim.hasReadPermission().then(
      (info) => console.log('Has permission: ', info)
    );
    
    this.sim.requestReadPermission().then(
      () => console.log('Permission granted'),
      () => console.log('Permission denied')
    );
 
    this.sim.getSimInfo().then(
      (resultadoSIM) => this.info = resultadoSIM,
      (err) => console.log('Error en obtener la info  ', err)
    );

    loading.dismiss();
  }   

  async LogIn(){
    const loading = await this.loadingController.create({
      message: 'Iniciando Sesion ...',
      spinner: 'crescent'
    });
    await loading.present();
    const login = {NOMBRE_USUARIO:this.todo.usuario,NUMERO_IMEI:this.info['deviceId'],NUMERO_TELEFONO:this.info['phoneNumber']};
      //console.log(' LogIn() login = '+JSON.stringify(login));
      this.loginService.logIn(login).subscribe((data)=> {
        //console.log('respuesta data = '+JSON.stringify(data));
        if(data['respuesta'] === true){
          //alert('Usuario correcto !');
          this.storage.set('id_usuario',data['ID_USUARIO']);
          loading.dismiss();
          this.router.navigate(['/bienvenida',data['usuario']+';'+data['ID_USUARIO']]);
        }else{
          loading.dismiss();
          alert('Error al iniciar sesion !');
        }
      },(error)=>{
        console.error(error);
      }); 
  }

  async goMisiones(){
    this.router.navigateByUrl('/misiones');
  }

  capturarImagen(){
    const options: CameraOptions  = {
      quality         :100,
      destinationType : this.camera.DestinationType.DATA_URL,
      encodingType    : this.camera.EncodingType.JPEG,
      mediaType       : this.camera.MediaType.PICTURE,
      sourceType      : this.camera.PictureSourceType.CAMERA,
      correctOrientation : true
    };
    
    this.camera.getPicture(options).then((ImagenData) =>{
        this.image = 'data:image/jpeg;base64,'+ImagenData;
    },(error) => {
        console.log(error);
    });

  }

}
 