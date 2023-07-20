import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva} from 'src/app/modelos/Reservas';

@Component({
  selector: 'app-usuario-edita-reserva',
  templateUrl: './usuario-edita-reserva.component.html',
  styleUrls: ['./usuario-edita-reserva.component.css']
})
export class UsuarioEditaReservaComponent {
  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  reserva: Reserva = {
    fecha: '',
    hora: '',
    nombre_empresa: '', 
    nombre_usuario: '',
    nombre_rs: '',
    id_reserva: 0
  }

  empresa: string = ''
  usuario: string = ''
  id: number = 0
  aux: any= []

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["nombre_empresa"]
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
        this.reserva.id_reserva = this.aux[0].id_reserva

      },
      err => console.error(err)
    );
  }


  guardaCambiosReservaUsu(id_reserva: number, nuevaReserva: Reserva){
    console.log(id_reserva)
    console.log(nuevaReserva)
    this.reservasServices.guardaCambiosReservaUsu(this.usuario, id_reserva, nuevaReserva).subscribe(
      res => {
        let ruta = '/reservas/usuario/' + this.usuario + '/reservas'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }

  eliminaReservaUsu(id_reserva: number){
    this.reservasServices.eliminaReservaUsu(this.usuario, id_reserva).subscribe(
      res => {
        let ruta = '/reservas/usuario/' + this.usuario + '/reservas'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }
}
