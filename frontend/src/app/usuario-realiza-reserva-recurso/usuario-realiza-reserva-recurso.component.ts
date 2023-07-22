import { Component } from '@angular/core';
import { Recurso} from '../modelos/Recursos';
import { Reserva} from '../modelos/Reservas';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-realiza-reserva-recurso',
  templateUrl: './usuario-realiza-reserva-recurso.component.html',
  styleUrls: ['./usuario-realiza-reserva-recurso.component.css']
})
export class UsuarioRealizaReservaRecursoComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  recurso: Recurso = {
    nombre_rs: '',
    descripcion: '',
    foto: '',
    datos: '',
    aforo: 0,
    nombre_empresa: '',
    id_recursoservicio: 0,
    id_empresa: 0
  }

  usuario: string = ''
  id: number = 0
  aux: any

  reserva: Reserva ={
    fecha: '',
    hora: '',
    nombre_empresa: '', 
    nombre_usuario: '',
    nombre_rs: '',
    id_reserva: 0,
    id_recursoservicio: 0,
    id_empresa: 0
  }

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.usuario = params["nombre_usuario"]
    this.id = params["id_recursoservicio"]
    this.reservaServices.getDatosRecursoUsu(this.usuario, this.id).subscribe(
      res =>{
       this.aux = res
       console.log(res)
       this.recurso.nombre_rs = this.aux[0].nombre_rs
       this.recurso.descripcion = this.aux[0].descripcion
       this.recurso.foto = this.aux[0].foto
       this.recurso.datos = this.aux[0].datos
       this.recurso.aforo = this.aux[0].aforo
       this.recurso.nombre_empresa = this.aux[0].nombre_empresa
       this.recurso.id_recursoservicio = this.aux[0].id_recursoservicio
       this.recurso.id_empresa = this.aux[0].id_empresa

       this.reserva.nombre_empresa = this.recurso.nombre_empresa
       this.reserva.nombre_usuario = this.usuario
       this.reserva.nombre_rs = this.recurso.nombre_rs
       this.reserva.id_recursoservicio = this.recurso.id_recursoservicio
       this.reserva.id_empresa = this.recurso.id_empresa

      },
      err => console.error(err)
    );
  }

  crearReserva(nuevaReserva: Reserva){
    this.reservaServices.crearReserva(this.usuario, this.id, nuevaReserva).subscribe(
      res =>{
       let ruta = '/reservas/usuario/' + this.usuario + '/realiza_reserva'
       this.router.navigate([ruta])
      },
      err => console.error(err)
    );
  }
}
