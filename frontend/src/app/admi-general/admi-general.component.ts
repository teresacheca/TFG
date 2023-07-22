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
    id_empresa: 0
  }

  empresas: any = []

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    
    this.reservaServices.getLogin(params["nombre_usuario"], params["contrasena"]).subscribe(
      res => {
        //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
        this.admi_general.nombre_usuario = params["nombre_usuario"]
        this.admi_general.contrasena = params["contrasena"]
        this.admi_general.id = params["id"]
        this.admi_general.empresa = params["empresa"]
        console.log(this.admi_general)
      },
      err=> console.error(err)
    )
    
  }

  mostrarEmpresas(){
    this.router.navigate(['/reservas/empresas']);
  }

  mostrarSolicitudes(){
    this.router.navigate(['/reservas/lista_solicitudes']);
  }

  
}
