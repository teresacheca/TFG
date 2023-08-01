import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { Usuario } from 'src/app/modelos/Usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-edita-perfil',
  templateUrl: './usuario-edita-perfil.component.html',
  styleUrls: ['./usuario-edita-perfil.component.css']
})
export class UsuarioEditaPerfilComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute ){}

  usuario: Usuario = {
    nombre_usuario: '',
    contrasena: '',
    tipo: 2,
    id: 0,
    empresa: '',
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    id_empresa: 0
  }
  fecha_nacimiento: string = ""

  aux: any = []

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    
    this.usuario.nombre_usuario = params["nombre_usuario"]

    console.log(this.usuario)
    this.reservaServices.getUsuario(this.usuario.nombre_usuario).subscribe(
      res => {
        this.aux = res
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.id = this.aux[0].id
        this.usuario.empresa = this.aux[0].empresa   
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo 
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento  
        this.usuario.id_empresa = this.aux[0].id_empresa      

        this.fecha_nacimiento = moment(this.usuario.fecha_nacimiento).format('YYYY-MM-DD')
      },
      err => console.error(err)
    )
    
  }

  guardarCambiosUsuario(nombre_usuario: string, nuevoUsuario: Usuario, fecha: string){
    nuevoUsuario.fecha_nacimiento = new Date(fecha)
    this.reservaServices.guardarCambiosUsuario(nombre_usuario, nuevoUsuario).subscribe(
      res => {
        let ruta = '/reservas/usuario/' + nombre_usuario
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }

  eliminarCuentaUsuarioUsu(nombre_usuario: string){
    this.reservaServices.eliminarCuentaUsuarioUsu(nombre_usuario).subscribe(
      res => {
        let ruta = '/reservas/login'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )

  }

}
