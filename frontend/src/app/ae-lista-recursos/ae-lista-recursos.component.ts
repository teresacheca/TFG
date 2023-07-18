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
  empresa: string = ''
  admi: string = ''

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["nombre_empresa"]
    this.admi = params["nombre_usuario"]
    console.log(params)
    this.reservasServices.getRecursosAe(this.admi, this.empresa).subscribe(
      res =>{
       console.log(res)
       this.recursos = res
       console.log(this.recursos)
      },
      err => console.error(err)
    );
  }

  AeVeRecurso(id_recursoservicio: number){
    console.log(id_recursoservicio)
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
