import { Component } from '@angular/core';
import { Usuario} from '../modelos/Usuarios';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-ae-edita-perfil',
  templateUrl: './ae-edita-perfil.component.html',
  styleUrls: ['./ae-edita-perfil.component.css']
})
export class AeEditaPerfilComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  aux: any = {  }

  admi_empresa: Usuario={
    nombre_usuario: '',
    contrasena: '',
    tipo: 1,
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    empresa: '',
    id: 0,
    id_empresa: 0
  }

  fecha_nacimiento: any

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.reservaServices.getDatosAdministradorEmpresa(params["nombre_usuario"], params["id_empresa"]).subscribe(
      res => {
        //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
        this.aux = res
        this.admi_empresa.nombre_usuario = this.aux[0].nombre_usuario
        this.admi_empresa.contrasena = this.aux[0].contrasena
        this.admi_empresa.tipo = this.aux[0].tipo
        this.admi_empresa.fecha_nacimiento = this.aux[0].fecha_nacimiento
        this.admi_empresa.puesto_trabajo = this.aux[0].puesto_trabajo
        this.admi_empresa.empresa = this.aux[0].empresa
        this.admi_empresa.id = this.aux[0].id
        this.admi_empresa.id_empresa = this.aux[0].id_empresa
        this.fecha_nacimiento = moment(this.admi_empresa.fecha_nacimiento).format('YYYY-MM-DD')
      },
      err=> console.error(err)
    )
  }

  eliminarCuentaAdmiEmpresaAe(nombre: string){
    this.reservaServices.eliminarCuentaAdmiEmpresaAe(nombre).subscribe(
      res => {
        let ruta = '/reservas/login'
        this.router.navigate([ruta]);
      },
      err => console.error(err)
    )
  }

  guardarCambiosAdmiEmpresaAe(nombre: string, nuevousuario: Usuario, fecha_nacimiento: any){
    nuevousuario.fecha_nacimiento = fecha_nacimiento;
    this.reservaServices.guardarCambiosAdmiEmpresaAe(nombre, nuevousuario).subscribe(
      res => {
        let ruta = '/reservas/admi_empresa/' + nombre
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }
  

}
