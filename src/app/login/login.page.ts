import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login = {};
  img = 'assets/icon/Logo-Falabella.png'

  constructor( private router: Router, private _loginService : LoginService) { }

  ngOnInit() {
  }

  async LogIn(){
    /* const loading = await this.loadingController.create({
      message: 'Iniciando Sesion ...',
      spinner: 'crescent'
    }); */
    //await loading.present();
    //const login = {NOMBRE_USUARIO:this.todo.usuario,NUMERO_IMEI:this.info['deviceId'],NUMERO_TELEFONO:this.info['phoneNumber']};
    //this.router.navigate(['/ingresaInventario']);
    //this._loginService.log().subscribe( resp => (console.log(resp)) );
    this.router.navigateByUrl('/preferencias');
    //loading.dismiss();
    //console.log(' LogIn() login = '+JSON.stringify(login));
      /* this.loginService.logIn(login).subscribe((data)=> {
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
      });  */
  }

}
