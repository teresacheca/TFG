import { Component } from '@angular/core';
import {Empresa} from '../modelos/Empresas';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent {

  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  aux: any = {  }

  empresa: Empresa={
    nombre_empresa: '',
    datos_de_contacto: '',
    descripcion: '',
    logo: '',
    direccion: '',
    id_empresa: 0
  }

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.reservaServices.getEmpresa(params["nombre_empresa"]).subscribe(
      res => {
        //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
        this.aux = res
        this.empresa.nombre_empresa = this.aux[0].nombre_empresa
        this.empresa.datos_de_contacto = this.aux[0].datos_de_contacto
        this.empresa.descripcion = this.aux[0].descripcion
        this.empresa.logo = this.aux[0].logo
        this.empresa.direccion = this.aux[0].direccion
        this.empresa.id_empresa = this.aux[0].id_empresa
      },
      err=> console.error(err)
    )
  }

  eliminarCuentaEmpresa(nombre_empresa: string){
    
    this.reservaServices.eliminarEmpresa(nombre_empresa).subscribe(
      res => {
        this.router.navigate(['/reservas/empresas']);
      },
      err => console.error(err)
    )
  }

  guardarCambios(nombre_empresa: string, empresa : Empresa){
    console.log("guardar cambios")
    this.reservaServices.guardarCambios(nombre_empresa, empresa).subscribe(
      res => {
        this.router.navigate(['/reservas/empresas', nombre_empresa]);

      },
      err=> console.error(err)
    )
  }
}
