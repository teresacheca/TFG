import { Component } from '@angular/core';
import { Usuario} from '../modelos/Usuarios';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-ag-ve-usuario',
  templateUrl: './ag-ve-usuario.component.html',
  styleUrls: ['./ag-ve-usuario.component.css']
})
export class AgVeUsuarioComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  aux: any = {  }

  usuario: Usuario={
    nombre_usuario: '',
    contrasena: '',
    tipo: 1,
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    empresa: '',
    id: 0,
    id_empresa: 0
  }

  empresa: number = 0
  fecha_nacimiento: string = ""
  nombre_admi: string = ""
  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
    console.log(params)
    this.reservaServices.getUsuarioId(params["nombre_usuario"], this.empresa, params["id"] ).subscribe(
      res => {
        //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
        this.aux = res
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo
        this.usuario.empresa = this.aux[0].empresa
        this.usuario.id = this.aux[0].id
        this.fecha_nacimiento = moment(this.usuario.fecha_nacimiento).format('YYYY-MM-DD')
      },
      err=> console.error(err)
    )
  }

  volver(){
    console.log(this.empresa)
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/'+ this.empresa + '/lista_usuarios'
    this.router.navigate([ruta])
  }

}
