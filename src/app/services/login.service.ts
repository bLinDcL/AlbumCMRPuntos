import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login }      from './../interfaces/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //host = 'https://mercaderistas-254014.appspot.com';
  host = 'http://10.10.100.134:8080';
  constructor(
    private httpClient : HttpClient,
  ) {}

  logIn(login : Login){
     const path = this.host+'/inicioSesion';
     return this.httpClient.post(path,login);
  }

  insertEvidencia(evidencia : any){
    const path = this.host+'/insertEvidencia';
    return this.httpClient.post(path,evidencia);
 }

  getEvidencias(){
    const path = this.host+'/getEvidencias';
    return this.httpClient.get(path);  
  }

  getUbicacionByUsuario(dataPost:any){
    const path = this.host+'/verificarUbicacion/:'+dataPost;
    return this.httpClient.get(path); 
  }

  getTareaByUsuario(ID_USUARIO:any){
    const path = this.host+'/getTareaByUsuario/'+ID_USUARIO;
    return this.httpClient.get(path); 
  }

  getSubTareasByTarea(ID_TAREA:any){
    const path = this.host+'/getSubTareasByTarea/'+ID_TAREA;
    return this.httpClient.get(path);  
  }

  getEvidenciasBySubTarea(ID_SUBTAREA:any){
    const path = this.host+'/getEvidenciasBySubTarea/'+ID_SUBTAREA;
    return this.httpClient.get(path);  
  }

  getSkuCategoria(data:any){
    const path = this.host+'/getSkuCategoria/'+data;
    return this.httpClient.get(path); 
  }

  getUpcByProducto(id_producto:any){
    const path = this.host+'/getUpcByProducto/'+id_producto;
    return this.httpClient.get(path); 
  }

  getProductosByCategoria(id_producto:any){
    const path = this.host+'/getProductosByCategoria/'+id_producto;
    return this.httpClient.get(path); 
  }

  getSubTareas(id_subtar:any){
    const path = this.host+'/getSubTareas/'+id_subtar;
    return this.httpClient.get(path); 
  }
}

