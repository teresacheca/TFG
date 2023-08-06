import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {
  
  constructor(private router: Router, private activeRoute: ActivatedRoute, private reservasServices: ReservasService){

  }

  empresas: any = []
  nombre_admi: string = ""

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.nombre_admi = params["nombre_usuario"]
    this.reservasServices.getEmpresas(this.nombre_admi).subscribe(
      res =>{
        console.log(res)
        this.empresas = res;
      },
      err => console.error(err)
    );
  }

  verEmpresa(id_empresa: string){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + id_empresa
    this.router.navigate([ruta]);
  }

  volver(){
    let ruta = "reservas/admi_general/" + this.nombre_admi
    this.router.navigate([ruta])
  }
}
