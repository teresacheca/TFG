import { Component } from '@angular/core';
import { Usuario} from 'src/app/modelos/Usuarios';
import {OnInit, HostBinding } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-admi-empresa',
  templateUrl: './lista-admi-empresa.component.html',
  styleUrls: ['./lista-admi-empresa.component.css']
})
export class ListaAdmiEmpresaComponent {

  administradores: any = []
  vacio = false
  
  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){

  }

  empresa: number = 0
  nombre_admi: string = ""
  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
    this.reservasServices.getAdministradoresEmpresa(this.nombre_admi, this.empresa).subscribe(
      res =>{
        this.administradores = res;
        if(this.administradores.length == 0){
          this.vacio = true
        }
      },
      err => console.error(err)
    );
  }

  editarAdministradorEmpresa(admi: Usuario){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + admi.id_empresa + '/lista_administradores/' + admi.id;
    this.router.navigate([ruta]);
  }

  volver(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.empresa 
    this.router.navigate([ruta]);
  }

  aniadir(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.empresa + '/lista_administradores/aniadir'
    this.router.navigate([ruta]);
  }
}
