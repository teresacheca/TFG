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
  nombre_admi: string = ""

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}


  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]
    this.reservaServices.getSolicitudesAceptadas(this.nombre_admi).subscribe(
      res =>{
        this.aceptadas = res;
        if(this.aceptadas.length == 0){
          this.vacioAceptadas = true
        }
      },
      err => console.error(err)
    );
    this.reservaServices.getSolicitudesRechazadas(this.nombre_admi).subscribe(
      res =>{
        this.rechazadas = res;
        if(this.rechazadas.length == 0){
          this.vacioRechazadas = true
        }
        
      },
      err => console.error(err)
    );
    this.reservaServices.getSolicitudesPendientes(this.nombre_admi).subscribe(
      res =>{
        this.pendientes = res;
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

  volver(){
    let ruta = "reservas/admi_general/" + this.nombre_admi
    this.router.navigate([ruta])
  }
  
}
