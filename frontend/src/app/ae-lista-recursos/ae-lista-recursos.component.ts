import { Component } from '@angular/core';
import { Recurso} from 'src/app/modelos/Recursos';
import {OnInit, HostBinding } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-ae-lista-recursos',
  templateUrl: './ae-lista-recursos.component.html',
  styleUrls: ['./ae-lista-recursos.component.css']
})
export class AeListaRecursosComponent {
  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  recursos: any = []
  empresa: number = 0
  admi: string = ''

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.admi = params["nombre_usuario"]
    this.reservasServices.getRecursosAe(this.admi, this.empresa).subscribe(
      res =>{
       this.recursos = res
      },
      err => console.error(err)
    );
  }

  AeVeRecurso(id_recursoservicio: number){
    let ruta = this.router.url + '/' + id_recursoservicio
    this.router.navigate([ruta]);
  }

  AeEditaRecurso(id_recursoservicio: number){
    let ruta = this.router.url + '/' + id_recursoservicio + '/editar'
    this.router.navigate([ruta]);
  }

  AeAnidadeRecurso(){
    let ruta = this.router.url + '/aniade'
    this.router.navigate([ruta]);
  }
}
