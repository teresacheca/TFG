import { Component } from '@angular/core';
import { Usuario} from '../modelos/Usuarios';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    id: 0
  }

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    console.log(params["nombre_usuario"])
    let url = this.router.url.split('/');
    let empresa = url[3]
    console.log(empresa)
    this.reservaServices.getUsuarioag(empresa, params["nombre_usuario"]).subscribe(
      res => {
        //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
        this.aux = res
        console.log(this.aux)
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo
        this.usuario.empresa = this.aux[0].empresa
        this.usuario.id = this.aux[0].id
        console.log(this.usuario)
      },
      err=> console.error(err)
    )
  }

}
