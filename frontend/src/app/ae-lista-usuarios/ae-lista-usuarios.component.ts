import { Component } from '@angular/core';
import { Usuario} from 'src/app/modelos/Usuarios';
import {OnInit, HostBinding } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ae-lista-usuarios',
  templateUrl: './ae-lista-usuarios.component.html',
  styleUrls: ['./ae-lista-usuarios.component.css']
})
export class AeListaUsuariosComponent {
  usuarios: any = []
  vacio = false
  empresa: number = 0

  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){

  }


  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.reservasServices.getUsuariosEmpresaAe(params["nombre_usuario"], params["id_empresa"]).subscribe(
      res =>{
        this.usuarios = res;
        if(this.usuarios.length == 0){
          this.vacio = true
        }
      },
      err => console.error(err)
    );
  }

  AeEditaUsuario(id: number){
    let ruta = this.router.url + '/' + id
    this.router.navigate([ruta]);
  }

  AeAniadeUsuario(){
    let ruta = this.router.url + '/aniade'
    this.router.navigate([ruta]);
  }
}
