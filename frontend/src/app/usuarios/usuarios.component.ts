import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { Usuario } from 'src/app/modelos/Usuarios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute ){}

  usuario: Usuario = {
    nombre_usuario: '',
    contrasena: '',
    tipo: 2,
    id: 0,
    empresa: '',
    foto: "",
    id_empresa: 0
  }

  aux: any = []

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    
    this.usuario.nombre_usuario = params["nombre_usuario"]

    this.reservaServices.getLogin(params["nombre_usuario"], params["contrasena"]).subscribe(
      res => {
        //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
        //this.reservaServices.getUsuarioag().subscribe
        this.usuario.nombre_usuario = params["nombre_usuario"]
        this.usuario.contrasena = params["contrasena"]
        this.usuario.id_empresa = params["id_empresa"]
        this.reservaServices.getUsuarioNombre(this.usuario.nombre_usuario).subscribe(
          res => {
            //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
            this.aux = res

            this.usuario.nombre_usuario = this.aux[0].nombre_usuario
            this.usuario.contrasena = this.aux[0].contrasena
            this.usuario.tipo = this.aux[0].tipo
            this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento
            this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo
            this.usuario.empresa = this.aux[0].empresa
            this.usuario.id = this.aux[0].id
            this.usuario.id_empresa = this.aux[0].id_empresa
            this.usuario.foto = this.aux[0].foto

          },
          err=> console.error(err)
        )
      },
      err=> console.error(err)
    )
    
  }

  editarPerfil(){
    let ruta = this.router.url + '/editar'
    this.router.navigate([ruta])
  }

  usuarioVeReservas(){
    let ruta = this.router.url + '/reservas'
    this.router.navigate([ruta])
  }

  usuarioRealizaReserva(){
    let ruta = this.router.url + '/realiza_reserva'
    this.router.navigate([ruta])
  }

  
}