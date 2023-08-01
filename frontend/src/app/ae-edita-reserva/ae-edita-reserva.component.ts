import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva} from 'src/app/modelos/Reservas';
import * as moment from 'moment';

@Component({
  selector: 'app-ae-edita-reserva',
  templateUrl: './ae-edita-reserva.component.html',
  styleUrls: ['./ae-edita-reserva.component.css']
})
export class AeEditaReservaComponent {

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
  nombre_admi: string = ''
  id: number = 0
  aux: any= []
  fecha: string = ""

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
    this.id = params["id_reserva"]
    
    this.reservasServices.getReservaId(this.nombre_admi, this.empresa, this.id).subscribe(
      res =>{
        this.aux = res
        this.reserva.fecha = this.aux[0].fecha
        this.reserva.hora = this.aux[0].hora
        this.reserva.nombre_empresa = this.aux[0].nombre_empresa
        this.reserva.nombre_usuario = this.aux[0].nombre_usuario
        this.reserva.nombre_rs = this.aux[0].nombre_rs
        this.reserva.id_reserva = this.aux[0].id_reserva
        this.reserva.id_recursoservicio = this.aux[0].id_recursoservicio
        this.reserva.id_empresa = this.aux[0].id_empresa

        this.fecha = moment(this.reserva.fecha).format('YYYY-MM-DD')

      },
      err => console.error(err)
    );
  }

  AeguardaCambiosReserva(id_reserva: number, nuevaReserva: Reserva, fecha: string){
    nuevaReserva.fecha = fecha
    this.reservasServices.AeguardaCambiosReserva(this.nombre_admi, this.empresa, id_reserva, nuevaReserva).subscribe(
      res => {
        let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_reservas'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }

  AeEliminaReserva(id_reserva: number){
    this.reservasServices.AeEliminaReserva(this.nombre_admi, this.empresa, id_reserva).subscribe(
      res => {
        let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_reservas'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }
  

}
