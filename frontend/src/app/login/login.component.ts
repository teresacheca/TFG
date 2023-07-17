import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ReservasService} from '../services/reservas.service';
import {Usuario} from 'src/app/modelos/Usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private activeRoute: ActivatedRoute, private reservasServices: ReservasService){}

  usuario: any = {}

  irNuevaSolicitud(){
    this.router.navigate(['/reservas/solicitud'])
  }

  inicioSesion(nombreUsuario: any, contrasenaUsuario: any){
    //Usuario o contraseña vacios
    if(nombreUsuario==''){
      confirm("Faltan parámetros");
    }else if(contrasenaUsuario==''){
      confirm("Faltan parámetros");
    }else{
      this.reservasServices.getLogin(nombreUsuario, contrasenaUsuario).subscribe(
        res => {
          this.usuario = res;
          console.log(this.usuario[0])
          if(this.usuario[0]!=null){
            if(this.usuario[0].tipo == '0'){
              this.router.navigate(['/reservas/admi_general', this.usuario[0].nombre_usuario]);
            }else if(this.usuario[0].tipo == '1'){
              this.router.navigate(['/reservas/admi_empresa', this.usuario[0].nombre_usuario]);
            }else if(this.usuario[0].tipo == '2'){
              this.router.navigate(['/reservas/usuario', this.usuario[0].nombre_usuario]);
            }
            
          }else{
            confirm("Error en login");
          }
        },
        err => console.error(err)
      )
    }
  }
}
