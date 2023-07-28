import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ReservasService} from '../services/reservas.service';
import {Recurso} from '../modelos/Recursos'

@Component({
  selector: 'app-ae-aniade-recurso',
  templateUrl: './ae-aniade-recurso.component.html',
  styleUrls: ['./ae-aniade-recurso.component.css']
})
export class AeAniadeRecursoComponent {
  constructor(private router: Router, private activeRoute: ActivatedRoute, private reservasServices: ReservasService){}
  
  id_empresa: number = 0
  nombre_admi: string = ''

  recurso: Recurso ={
    nombre_rs: '',
    descripcion: '',
    foto: '',
    datos: '',
    aforo: 0,
    nombre_empresa: '',
    id_recursoservicio: 0,
    id_empresa: 0
  }

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.id_empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
  }

  AeaniadeRecurso(nombre_rs: string, descripcion: string, foto: string, datos: string, aforo: string){
    if(nombre_rs=='' || descripcion=='' || foto==''|| datos==''|| aforo==''){
      confirm("Faltan parámetros");
    }else{
      this.recurso.nombre_rs = nombre_rs
      this.recurso.descripcion = descripcion
      this.recurso.foto = foto
      this.recurso.datos = datos
      this.recurso.aforo = Number(aforo);
      this.recurso.id_empresa = this.id_empresa
      this.reservasServices.AeaniadeRecurso(this.recurso, this.nombre_admi, this.id_empresa).subscribe(
        res => {
          let ruta = "/reservas/admi_empresa/" + this.nombre_admi + '/' + this.id_empresa + '/lista_recursos'
          this.router.navigate([ruta]);
        },
        err => console.error(err)
      )
    }
  }

}