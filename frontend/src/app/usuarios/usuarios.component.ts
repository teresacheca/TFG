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

  aux: any = []

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    
    this.usuario.nombre_usuario = params["nombre_usuario"]
    
  }

  editarPerfil(){
    let ruta = this.router.url + '/editar'
    this.router.navigate([ruta])
  }

  
}