import { Component } from '@angular/core';
import { Recurso} from '../modelos/Recursos';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ae-edita-recurso',
  templateUrl: './ae-edita-recurso.component.html',
  styleUrls: ['./ae-edita-recurso.component.css']
})
export class AeEditaRecursoComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  recurso: Recurso = {
    nombre_rs: '',
    descripcion: '',
    foto: '',
    datos: '',
    aforo: 0,
    nombre_empresa: '',
    id_recursoservicio: 0,
    id_empresa: 0
  }

  empresa: number = 0
  admi: string = ''
  id: number = 0
  aux: any
  selectedFile: File | null = null;
  nombre_recurso: string = ""

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.admi = params["nombre_usuario"]
    this.id = params["id_recursoservicio"]
    this.reservaServices.getDatosRecursoAe(this.admi, this.empresa, this.id).subscribe(
      res =>{
       this.aux = res
       this.recurso.nombre_rs = this.aux[0].nombre_rs
       this.recurso.descripcion = this.aux[0].descripcion
       this.recurso.foto = this.aux[0].foto
       this.recurso.datos = this.aux[0].datos
       this.recurso.aforo = this.aux[0].aforo
       this.recurso.nombre_empresa = this.aux[0].nombre_empresa
       this.recurso.id_recursoservicio = this.aux[0].id_recursoservicio
       this.recurso.id_empresa = this.aux[0].id_empresa
       this.nombre_recurso = this.recurso.nombre_rs
      },
      err => console.error(err)
    );
    
  }

  eliminarRescursoAe(id_recursoservicio: number){
    this.reservaServices.eliminarRescursoAe(this.admi, this.empresa, id_recursoservicio).subscribe(
      res => {
        let ruta = '/reservas/admi_empresa/' + this.admi + '/' + this.empresa + '/lista_recursos'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }
  

  guardarCambiosRecursoAe(id_recursoservicio: number, recurso: Recurso){

    this.reservaServices.getRecursos(this.admi, this.empresa).subscribe(
      res => {
        this.aux = res
        let encontrado = false
        for(const nombre of this.aux){
          if(nombre.nombre_rs == recurso.nombre_rs && this.nombre_recurso != recurso.nombre_rs){
            encontrado = true
          }
        }
        if(encontrado){
          confirm("Ya existe un recurso o servicio con ese nombre en la empresa");
        }else{
          this.reservaServices.guardarCambiosRecursoAe(this.admi, this.empresa, id_recursoservicio, recurso).subscribe(
            res => {
              let ruta = '/reservas/admi_empresa/' + this.admi + '/' + this.empresa + '/lista_recursos'
              this.router.navigate([ruta]);
            },
            err=> console.error(err)
          )
        }
      },
      err=> console.error(err)
    )
   
  }



  volver(){
    let ruta = '/reservas/admi_empresa/' + this.admi + '/' + this.empresa + '/lista_recursos'
    this.router.navigate([ruta])
  }
}
