import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ReservasService} from '../services/reservas.service';
import {Empresa} from '../modelos/Empresas' ///importar la interfaz

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {
  constructor(private router: Router, private activeRoute: ActivatedRoute, private reservasServices: ReservasService){}

  empresa: Empresa = {
    nombre_empresa: '',
    logo: '',
    datos_de_contacto: '',
    descripcion: '',
    direccion: '',
    id_empresa: 0
  }

  crearSolicitud(nombre: any, logo: any, datos_de_contacto: any, descripcion: any){
    if(nombre=='' || logo==''|| datos_de_contacto==''|| descripcion==''){
      confirm("Faltan parámetros");
    }else{
      this.empresa.nombre_empresa = nombre;
      this.empresa.logo = logo;
      this.empresa.datos_de_contacto = datos_de_contacto;
      this.empresa.descripcion = descripcion;
      console.log(this.empresa)
      this.reservasServices.crearSolicitud(this.empresa).subscribe(
        res => {
          this.router.navigate(['/reservas/login']);
        },
        err => console.error(err)
      )
    }
    
  }
}
