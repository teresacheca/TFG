import { Component } from '@angular/core';
import { Usuario} from '../modelos/Usuarios';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-ae-edita-usuario',
  templateUrl: './ae-edita-usuario.component.html',
  styleUrls: ['./ae-edita-usuario.component.css']
})
export class AeEditaUsuarioComponent {
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

  nombre_admi: string = ''
  empresa: number = 0
  fecha_nacimiento: any

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]
    this.empresa = params["id_empresa"]
    this.reservaServices.getUsuarioId(params["nombre_usuario"], params["id_empresa"], params["id"]).subscribe(
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
        this.usuario.id_empresa = this.aux[0].id_empresa
        this.fecha_nacimiento = moment(this.usuario.fecha_nacimiento).format('YYYY-MM-DD')
      },
      err=> console.error(err)
    )
  }

  guardarCambiosUsuarioAe(id: number, nuevoUsuario: Usuario, fecha_nacimiento: any){
    nuevoUsuario.fecha_nacimiento = fecha_nacimiento;
    this.reservaServices.guardarCambiosUsuarioAe(this.nombre_admi, this.empresa, id, nuevoUsuario).subscribe(
      res => {
        let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_usuarios'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }

  eliminarCuentaUsuarioAe(id: number){
    this.reservaServices.eliminarCuentaUsuarioAe(this.nombre_admi, this.empresa, id).subscribe(
      res => {
        let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_usuarios'
        this.router.navigate([ruta]);
        this.aux = res
        this.reservaServices.getReservasDelUsuario(this.aux[0].nombre_usuario).subscribe(
          res => {
            this.aux = res            
            for(let i = 0 ; i < this.aux.length ; i++){
              this.reservaServices.eliminarReservas(this.nombre_admi, this.empresa, this.aux[i].id_reserva).subscribe(
                res => {
                  this.aux = res
                },
                err=> console.error(err)
              )
            }

          },
          err=> console.error(err)
        )
      },
      err=> console.error(err)
    )
  }
}
