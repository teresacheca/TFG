import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { Usuario } from 'src/app/modelos/Usuarios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admi-general',
  templateUrl: './admi-general.component.html',
  styleUrls: ['./admi-general.component.css']
})
export class AdmiGeneralComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute ){}

  admi_general: Usuario = {
    nombre_usuario: '',
    contrasena: '',
    tipo: 0,
    id: 0,
    empresa: '',
    foto: "",
    id_empresa: 0
  }

  empresas: any = []
  nombre_admi: string = ""
  aux: any = []

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]
    this.reservaServices.getLogin(params["nombre_usuario"], params["contrasena"]).subscribe(
      res => {
        //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
        this.admi_general.nombre_usuario = params["nombre_usuario"]
        this.admi_general.contrasena = params["contrasena"]
        this.admi_general.id = params["id"]
        this.admi_general.empresa = params["empresa"]
        this.reservaServices.getUsuarioNombre(this.admi_general.nombre_usuario).subscribe(
          res => {
           this.aux = res
           this.admi_general.nombre_usuario = this.aux[0].nombre_usuario
            this.admi_general.contrasena = this.aux[0].contrasena
            this.admi_general.tipo = this.aux[0].tipo
            this.admi_general.fecha_nacimiento = this.aux[0].fecha_nacimiento
            this.admi_general.puesto_trabajo = this.aux[0].puesto_trabajo
            this.admi_general.empresa = this.aux[0].empresa
            this.admi_general.id = this.aux[0].id
            this.admi_general.foto = this.aux[0].foto
          },
          err=> console.error(err)
        )
      },
      err=> console.error(err)
    )
    
  }

  mostrarEmpresas(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas'
    this.router.navigate([ruta]);
  }

  mostrarSolicitudes(){
    let ruta = '/reservas/' + this.nombre_admi + '/lista_solicitudes'
    this.router.navigate([ruta]);
  }

  
}
