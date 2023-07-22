import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuarios';

@Component({
  selector: 'app-usuario-ve-reservas',
  templateUrl: './usuario-ve-reservas.component.html',
  styleUrls: ['./usuario-ve-reservas.component.css']
})
export class UsuarioVeReservasComponent {

  mis_reservas: any = []
  reservas_empresa: any = []
  vacio = false

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

  aux: any = []

  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.usuario.nombre_usuario = params["nombre_usuario"]
    this.reservasServices.getUsuario(params["nombre_usuario"]).subscribe(
      res =>{
        this.aux = res
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.id = this.aux[0].id
        this.usuario.empresa = this.aux[0].empresa   
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo 
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento  
        this.usuario.id_empresa = this.aux[0].id_empresa  
        this.getReservasUsuario()
        this.getReservasEmpresa()
      },
      err => console.error(err)
    );
  }

  getReservasUsuario(){
    this.reservasServices.getReservasDelUsuario(this.usuario.nombre_usuario).subscribe(
      res =>{
        this.mis_reservas = res
      },
      err => console.error(err)
    );
  }

  getReservasEmpresa(){
    this.reservasServices.getReservasEmpresa(this.usuario.nombre_usuario, this.usuario.id_empresa).subscribe(
      res =>{
        this.reservas_empresa = res
      },
      err => console.error(err)
    );
  }

  verReserva(id_reserva: number){
    let ruta = this.router.url + '/ver/' + id_reserva
    this.router.navigate([ruta])
  }
}
