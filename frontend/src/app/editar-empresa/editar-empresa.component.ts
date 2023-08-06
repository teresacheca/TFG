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
  id_empresa: number = 0
  nombre_admi:string = ""
  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.id_empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
    this.reservaServices.getEmpresaId(this.nombre_admi, params["id_empresa"]).subscribe(
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

  eliminarCuentaEmpresa(id_empresa: number){
    
    this.reservaServices.eliminarEmpresa(this.nombre_admi, id_empresa).subscribe(
      res => {
        let ruta = '/reservas/' + this.nombre_admi + '/empresas/'
        this.router.navigate([ruta]);
      },
      err => console.error(err)
    )
  }

  guardarCambios(id_empresa: number, empresa : Empresa){
    this.reservaServices.guardarCambios(this.nombre_admi, id_empresa, empresa).subscribe(
      res => {
        let ruta = '/reservas/' + this.nombre_admi + '/empresas/'+ this.empresa.id_empresa
        this.router.navigate([ruta ]);

      },
      err=> console.error(err)
    )
  }

  volver(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.id_empresa 
    this.router.navigate([ruta])
  }
}
