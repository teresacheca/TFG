import { Component } from '@angular/core';
import { Empresa} from '../modelos/Empresas';
import {Solicitud} from '../modelos/Solicitud';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.css']
})
export class VerSolicitudComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  aux: any = {  }

  empresa: Empresa={
    nombre_empresa: '',
    datos_de_contacto: '',
    descripcion: '',
    logo: '',
    direccion: '',
    id_empresa: 0
  }

  solicitud: Solicitud={
    nombre_empresa: '',
    datos_de_contacto: '',
    descripcion: '',
    logo: '',
    direccion: '',
    id_empresa: 0,
    estado: '',
    id_solicitud: '',
    nombre_usuario: ''
  }

  pendiente = false
  nombre_admi: string = ""
  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]
    this.reservaServices.getSolicitud(params["nombre_usuario"], params["id_solicitud"]).subscribe(
      res => {

        this.aux = res
        this.empresa.nombre_empresa = this.aux[0].nombre_empresa
        this.empresa.datos_de_contacto = this.aux[0].datos_de_contacto
        this.empresa.descripcion = this.aux[0].descripcion
        this.empresa.logo = this.aux[0].logo
        this.empresa.direccion = this.aux[0].direccion
        this.empresa.id_empresa = this.aux[0].id_empresa

        this.solicitud.nombre_empresa = this.aux[0].nombre_empresa
        this.solicitud.datos_de_contacto = this.aux[0].datos_de_contacto
        this.solicitud.descripcion = this.aux[0].descripcion
        this.solicitud.logo = this.aux[0].logo
        this.solicitud.direccion = this.aux[0].direccion
        this.solicitud.id_empresa = this.aux[0].id_empresa
        this.solicitud.estado = this.aux[0].estado
        this.solicitud.id_solicitud = this.aux[0].id_solicitud
        this.solicitud.nombre_usuario = this.aux[0].nombre_usuario
        if(this.solicitud.estado == 'Pendiente'){
          this.pendiente = true
        }

      },
      err=> console.error(err)
    )
      
  }
  
  aceptarSolicitud(){
    this.reservaServices.nuevaEmpresa(this.nombre_admi, this.aux[0].id_solicitud, this.empresa.nombre_empresa, this.empresa).subscribe(
      res => {
        this.solicitud.estado = 'Aceptada'
        this.reservaServices.actualizarSolicitud(this.nombre_admi,this.aux[0].id_solicitud, this.solicitud).subscribe( //borrar la solicitud cunado se ejecuta una accion
          res => {
            let ruta = '/reservas/' + this.nombre_admi + '/lista_solicitudes'
            this.router.navigate([ruta]);
          },
          err=> console.error(err)
        )
      },
      err=> console.error(err)
    )
  }

  rechazarSolicitud(){
    this.solicitud.estado = 'rechazada'
        this.reservaServices.actualizarSolicitud(this.nombre_admi,this.aux[0].id_solicitud, this.solicitud).subscribe(
      res => {
        let ruta = '/reservas/' + this.nombre_admi + '/lista_solicitudes'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }
  

  volver(){
    let ruta = '/reservas/' + this.nombre_admi + '/lista_solicitudes'
    this.router.navigate([ruta])
  }
}
