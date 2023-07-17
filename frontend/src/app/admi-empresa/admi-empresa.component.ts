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
    id: 0, 
    empresa: ''
  }


  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.admi_empresa.nombre_usuario = params["nombre_usuario"]
    this.admi_empresa.contrasena = params["contrasena"]
    this.admi_empresa.id = params["id"]
    this.admi_empresa.empresa = params["empresa"]
    console.log(this.admi_empresa)
  }

  

  
}