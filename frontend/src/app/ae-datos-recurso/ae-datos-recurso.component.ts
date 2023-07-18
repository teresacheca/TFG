import { Component } from '@angular/core';
import { Recurso} from 'src/app/modelos/Recursos';
import {OnInit, HostBinding } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ae-datos-recurso',
  templateUrl: './ae-datos-recurso.component.html',
  styleUrls: ['./ae-datos-recurso.component.css']
})
export class AeDatosRecursoComponent {
  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  recurso: Recurso = {
    nombre_rs: '',
    descripcion: '',
    foto: '',
    datos: '',
    aforo: 0,
    nombre_empresa: '',
    id_recursoservicio: 0
  }

  empresa: string = ''
  admi: string = ''
  id: number = 0
  aux: any

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["nombre_empresa"]
    this.admi = params["nombre_usuario"]
    this.id = params["id_recursoservicio"]
    this.reservasServices.getDatosRecursoAe(this.admi, this.empresa, this.id).subscribe(
      res =>{
       this.aux = res
       this.recurso.nombre_rs = this.aux[0].nombre_rs
       this.recurso.descripcion = this.aux[0].descripcion
       this.recurso.foto = this.aux[0].foto
       this.recurso.datos = this.aux[0].datos
       this.recurso.aforo = this.aux[0].aforo
       this.recurso.nombre_empresa = this.aux[0].nombre_empresa
       this.recurso.id_recursoservicio = this.aux[0].id_recursoservicio
      },
      err => console.error(err)
    );
  }

}
