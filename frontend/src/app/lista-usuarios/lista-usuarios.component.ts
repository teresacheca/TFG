import { Component } from '@angular/core';
import { Usuario} from 'src/app/modelos/Usuarios';
import {OnInit, HostBinding } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {
  usuarios: any = []
  vacio = false

  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){

  }

  ngOnInit(){
    let url = this.router.url.split('/');
    let empresa = url[3]
    this.reservasServices.getUsuariosEmpresa(empresa).subscribe(
      res =>{
        this.usuarios = res;
        if(this.usuarios.length == 0){
          this.vacio = true
        }
      },
      err => console.error(err)
    );
  }

  verUsuario(nombre_usuario: string){
    let url = this.router.url.split('/');
    let empresa = url[3]
    let ruta = '/reservas/empresas/' + empresa + '/lista_usuarios/' + nombre_usuario
    this.router.navigate([ruta]);
  }
}
