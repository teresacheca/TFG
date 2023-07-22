import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ae-lista-reservas',
  templateUrl: './ae-lista-reservas.component.html',
  styleUrls: ['./ae-lista-reservas.component.css']
})
export class AeListaReservasComponent {
  reservas: any = []
  vacio = false
  empresa: number = 0
  nombre_admi: string = ''

  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
    this.reservasServices.getReservasAe(this.nombre_admi, this.empresa).subscribe(
      res =>{
        this.reservas = res;
        console.log(res)
        if(this.reservas.length == 0){
          this.vacio = true
        }
      },
      err => console.error(err)
    );
  }

  veReservaAe(id_reserva: number){
    let ruta = this.router.url + '/' + id_reserva
    this.router.navigate([ruta])
  }

}
