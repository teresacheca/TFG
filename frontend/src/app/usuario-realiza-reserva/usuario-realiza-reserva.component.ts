import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuarios';

@Component({
  selector: 'app-usuario-realiza-reserva',
  templateUrl: './usuario-realiza-reserva.component.html',
  styleUrls: ['./usuario-realiza-reserva.component.css']
})
export class UsuarioRealizaReservaComponent {

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
  recursos: any = []

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
        this.getRecursos(this.usuario.nombre_usuario)
      },
      err => console.error(err)
    );
  }

  volver(){
    let ruta =  '/reservas/usuario/' + this.usuario.nombre_usuario
    this.router.navigate([ruta])
  }

  getRecursos(nombre_usuario: string){
    this.reservasServices.getRecursos(nombre_usuario, this.usuario.id_empresa).subscribe(
      res =>{
        this.recursos = res
        
      },
      err => console.error(err)
    );
  }

  reservarRecurso(id_recursoservicio: number){
    let ruta = this.router.url + '/recurso/' + id_recursoservicio
    this.router.navigate([ruta])
  }
}
