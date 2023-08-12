import { Component } from '@angular/core';
import { Usuario} from '../modelos/Usuarios';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-ag-edita-admi-empresa',
  templateUrl: './ag-edita-admi-empresa.component.html',
  styleUrls: ['./ag-edita-admi-empresa.component.css']
})
export class AgEditaAdmiEmpresaComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  aux: any = {  }

  usuario: Usuario={
    nombre_usuario: '',
    contrasena: '',
    tipo: 1,
    id: 0,
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    empresa: '',
    foto: "",
    id_empresa: 0
  }
  fecha_nacimiento: string = ""
  nombre: string = ""
  id_empresa: number = 0
  nombre_admi_general: string = ""

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.id_empresa = params["id_empresa"]
    this.nombre_admi_general = params["nombre_usuario"]
    this.reservaServices.getAdministradorEmpresa(this.nombre_admi_general, params["id"], params["id_emrpesa"]).subscribe(
      res => {
        //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
        this.aux = res
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.nombre = this.usuario.nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.id = this.aux[0].id
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo
        this.usuario.empresa = this.aux[0].empresa
        this.usuario.foto = this.aux[0].foto
        this.usuario.id_empresa = this.aux[0].id_empresa
        this.fecha_nacimiento = moment(this.usuario.fecha_nacimiento).format('YYYY-MM-DD')
      },
      err=> console.error(err)
    )
  }


  eliminarCuentaAdmiEmpresa(id: number, id_empresa: number){
    
    this.reservaServices.eliminarCuentaAdmiEmpresa(this.nombre_admi_general,id, id_empresa).subscribe(
      res => {
        let ruta = '/reservas/' + this.nombre_admi_general + '/empresas/' + id_empresa + '/lista_administradores'
        this.router.navigate([ruta]);
      },
      err => console.error(err)
    )
  }

  guardarCambiosAdmiEmpresa(id: number, id_empresa: number, nuevoUsuario: Usuario, fecha: string){
    nuevoUsuario.fecha_nacimiento = new Date(fecha)

    this.reservaServices.getUsuarioNombre(this.usuario.nombre_usuario).subscribe(
      res => {
        this.aux = res
        if(this.aux.length > 0 && this.nombre != nuevoUsuario.nombre_usuario){
          confirm("Ese nombre ya está en uso");
        }else{
          this.reservaServices.getEmpresa(this.nombre_admi_general, nuevoUsuario.empresa).subscribe(
            res => {
             this.aux = res
             if(this.aux.length == 0){
              confirm("La empresa seleccionada no existe")
             }else{
              nuevoUsuario.id_empresa = this.aux[0].id_empresa
              this.reservaServices.guardarCambiosAdmiEmpresa(this.nombre_admi_general, id, id_empresa, nuevoUsuario).subscribe(
                res => {
                  let ruta = '/reservas/' + this.nombre_admi_general + '/empresas/' + id_empresa + '/lista_administradores'
                  this.router.navigate([ruta]);
                },
                err=> console.error(err)
              )
             }
            },
            err=> console.error(err)
          )
          
        }
      },
      err => console.error(err)
    )
  }

  volver(){
    let ruta = '/reservas/' + this.nombre_admi_general + '/empresas/'+ this.id_empresa + '/lista_administradores'
    this.router.navigate([ruta])
  }

  mostrarContrasena = false;
  

  togglePasswordVisibility() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

}
