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

  empresa: number = 0
  nombre_admi: string = ""

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
    this.reservasServices.getUsuariosEmpresa(this.nombre_admi, this.empresa).subscribe(
      res =>{
        this.usuarios = res;
        if(this.usuarios.length == 0){
          this.vacio = true
        }
      },
      err => console.error(err)
    );
  }

  verUsuario(id: number){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.empresa + '/lista_usuarios/' + id
    this.router.navigate([ruta]);
  }

  volver(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.empresa 
    this.router.navigate([ruta])
  }
}
