import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { Usuario } from 'src/app/modelos/Usuarios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admi-empresa',
  templateUrl: './admi-empresa.component.html',
  styleUrls: ['./admi-empresa.component.css']
})
export class AdmiEmpresaComponent {

   constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute ){}

  admi_empresa: Usuario = {
    nombre_usuario: '',
    contrasena: '',
    tipo: 1,
    empresa: '',
    id: 0
  }
  aux: any = {}


  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    
    this.reservaServices.getLogin(params["nombre_usuario"], params["contrasena"]).subscribe(
      res => {
        //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
        console.log("!!")
        console.log(params)
        //this.reservaServices.getUsuarioag().subscribe
        this.admi_empresa.nombre_usuario = params["nombre_usuario"]
        this.admi_empresa.contrasena = params["contrasena"]
        this.admi_empresa.empresa = params["empresa"]
        this.reservaServices.getUsuarioNombre(this.admi_empresa.nombre_usuario).subscribe(
          res => {
            //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
            this.aux = res
            console.log(this.aux)
            this.admi_empresa.nombre_usuario = this.aux[0].nombre_usuario
            this.admi_empresa.contrasena = this.aux[0].contrasena
            this.admi_empresa.tipo = this.aux[0].tipo
            this.admi_empresa.fecha_nacimiento = this.aux[0].fecha_nacimiento
            this.admi_empresa.puesto_trabajo = this.aux[0].puesto_trabajo
            this.admi_empresa.empresa = this.aux[0].empresa
            this.admi_empresa.id = this.aux[0].id
            console.log(this.admi_empresa)
          },
          err=> console.error(err)
        )
        console.log(this.admi_empresa)
      },
      err=> console.error(err)
    )
    
  }

  editarPerfil(){
    let ruta = this.router.url + '/editar'
    this.router.navigate([ruta])
  }

  verUsuarios(){
    let ruta = this.router.url + '/' + this.admi_empresa.empresa + '/lista_usuarios'
    this.router.navigate([ruta])
  }

  verListaRecurosAe(){
    let ruta = this.router.url + '/' + this.admi_empresa.empresa + '/lista_recursos'
    this.router.navigate([ruta])
  }

  verReservasAe(){
    let ruta = this.router.url + '/' + this.admi_empresa.empresa + '/lista_reservas'
    this.router.navigate([ruta])
  }

  
}