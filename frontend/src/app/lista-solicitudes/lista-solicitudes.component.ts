import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent {

  solicitudes: any = []
  aceptadas: any = []
  rechazadas: any = []
  pendientes: any = []
  vacioAceptadas = false
  vacioRechazadas = false
  vacioPendientes= false
  vacio = false

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}


  ngOnInit(){
    this.reservaServices.getSolicitudesAceptadas().subscribe(
      res =>{
        this.aceptadas = res;
        console.log(this.aceptadas)
        if(this.aceptadas.length == 0){
          this.vacioAceptadas = true
        }
      },
      err => console.error(err)
    );
    this.reservaServices.getSolicitudesRechazadas().subscribe(
      res =>{
        this.rechazadas = res;
        console.log(this.rechazadas)
        if(this.rechazadas.length == 0){
          this.vacioRechazadas = true
        }
        
      },
      err => console.error(err)
    );
    this.reservaServices.getSolicitudesPendientes().subscribe(
      res =>{
        this.pendientes = res;
        console.log(this.pendientes)
        if(this.pendientes.length == 0){
          this.vacioPendientes = true
        }
      },
      err => console.error(err)
    );
    
  }

  verSolicitud(id: number){
    let ruta = this.router.url + '/' + id
    this.router.navigate([ruta]);
  }
  
}
