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

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}


  ngOnInit(){
    this.reservaServices.getSolicitudes().subscribe(
      res =>{
        this.solicitudes = res;
      },
      err => console.error(err)
    );
  }

  verSolicitud(id: number){
    let ruta = this.router.url + '/' + id
    this.router.navigate([ruta]);
  }
}
