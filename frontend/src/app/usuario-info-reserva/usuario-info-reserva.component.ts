import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva} from 'src/app/modelos/Reservas';

@Component({
  selector: 'app-usuario-info-reserva',
  templateUrl: './usuario-info-reserva.component.html',
  styleUrls: ['./usuario-info-reserva.component.css']
})
export class UsuarioInfoReservaComponent {
  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  reserva: Reserva = {
    fecha: '',
    hora: '',
    nombre_empresa: '', 
    nombre_usuario: '',
    nombre_rs: '',
    id_reserva: 0,
    id_recursoservicio: 0,
    id_empresa: 0
  }

  empresa: number = 0
  usuario: string = ''
  id: number = 0
  aux: any= []
  mia = false

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_emrpesa"]
    this.usuario = params["nombre_usuario"]
    this.id = params["id_reserva"]
    
    this.reservasServices.getReservaIdUsu(this.usuario, this.id).subscribe(
      res =>{
        console.log(res)
        this.aux = res
        this.reserva.fecha = this.aux[0].fecha
        this.reserva.hora = this.aux[0].hora
        this.reserva.nombre_empresa = this.aux[0].nombre_empresa
        this.reserva.nombre_usuario = this.aux[0].nombre_usuario
        this.reserva.nombre_rs = this.aux[0].nombre_rs
        this.reserva.id_recursoservicio = this.aux[0].id_recursoservicio
        this.reserva.id_empresa = this.aux[0].id_empresa
        if (this.reserva.nombre_usuario == this.usuario){
          this.mia = true
        }
      },
      err => console.error(err)
    );
  }

  editarReserva(){
    let ruta = this.router.url + '/editar'
    this.router.navigate([ruta])
  }
}
