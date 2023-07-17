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

  ngOnInit(){
    this.reservasServices.getEmpresas().subscribe(
      res =>{
        this.empresas = res;
      },
      err => console.error(err)
    );
  }

  verEmpresa(nombre: string){
    this.router.navigate(['/reservas/empresas', nombre]);
  }
}
