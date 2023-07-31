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
       this.recurso.id_empresa = this.aux[0].id_emrpesa
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
    this.reservaServices.guardarCambiosRecursoAe(this.admi, this.empresa, id_recursoservicio, recurso).subscribe(
      res => {
        let ruta = '/reservas/admi_empresa/' + this.admi + '/' + this.empresa + '/lista_recursos'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileType = file.type;
      if (fileType.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFile = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        // Si el archivo seleccionado no es una imagen, mostrar un mensaje de error o realizar alguna otra acción
        confirm('El archivo seleccionado no es una imagen.');
      }
    }
  }

  dataURItoBlob(dataURI: string, callback: (blob: Blob) => void) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    callback(blob);
  }
}
