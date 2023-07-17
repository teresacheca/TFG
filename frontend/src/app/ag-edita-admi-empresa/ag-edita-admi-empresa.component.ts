import { Component } from '@angular/core';
import { Usuario} from '../modelos/Usuarios';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ag-edita-admi-empresa',
  templateUrl: './ag-edita-admi-empresa.component.html',
  styleUrls: ['./ag-edita-admi-empresa.component.css']
})
export class AgEditaAdmiEmpresaComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  aux: any = {  }

  usuario: Usuario={
    nombre_usuario: '',
    contrasena: '',
    tipo: 1,
    id: 0,
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    empresa: ''
  }

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.reservaServices.getAdministradorEmpresa(params["id"], params["nombre_empresa"]).subscribe(
      res => {
        //this.reserva = res; //no funciona -> tiene que aparecer la información antigua para editar sobre ella
        this.aux = res
        console.log(this.aux)
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.id = this.aux[0].id
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo
        this.usuario.empresa = this.aux[0].empresa
        console.log(this.usuario)
      },
      err=> console.error(err)
    )
  }


  eliminarCuentaAdmiEmpresa(id: number, empresa: string){
    
    this.reservaServices.eliminarCuentaAdmiEmpresa(id, empresa).subscribe(
      res => {
        let ruta = '/reservas/empresas/' + empresa
        this.router.navigate([ruta]);
      },
      err => console.error(err)
    )
  }

  guardarCambiosAdmiEmpresa(id: number, empresa: string, nuevousuario: Usuario){
    console.log("guardar cambios")
    this.reservaServices.guardarCambiosAdmiEmpresa(id, empresa, nuevousuario).subscribe(
      res => {
        let ruta = '/reservas/empresas/' + empresa + '/lista_administradores'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }

}
