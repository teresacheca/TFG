import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { Usuario } from 'src/app/modelos/Usuarios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute ){}

  usuario: Usuario = {
    nombre_usuario: '',
    contrasena: '',
    tipo: 2,
    id: 0,
    empresa: ''
  }

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    
    this.usuario.nombre_usuario = params["nombre_usuario"]
    this.usuario.contrasena = params["contrasena"]
    this.usuario.id = params["id"]
    this.usuario.empresa = params["empresa"]
    console.log(this.usuario)
    
    
  }

  
}