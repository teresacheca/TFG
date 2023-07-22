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
  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.reservasServices.getAdministradoresEmpresa(this.empresa).subscribe(
      res =>{
        this.administradores = res;
        if(this.administradores.length == 0){
          this.vacio = true
        }
        console.log(this.administradores.length)
      },
      err => console.error(err)
    );
  }

  editarAdministradorEmpresa(admi: Usuario){
    let ruta = 'reservas/empresas/' + admi.id_empresa + '/lista_administradores/' + admi.id;
    this.router.navigate([ruta]);
  }
}
