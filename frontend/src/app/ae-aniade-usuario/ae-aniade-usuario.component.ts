import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ReservasService} from '../services/reservas.service';
import {Usuario} from '../modelos/Usuarios'

@Component({
  selector: 'app-ae-aniade-usuario',
  templateUrl: './ae-aniade-usuario.component.html',
  styleUrls: ['./ae-aniade-usuario.component.css']
})
export class AeAniadeUsuarioComponent {

  constructor(private router: Router, private activeRoute: ActivatedRoute, private reservasServices: ReservasService){}
  
  empresa: number = 0
  nombre_admi: string = ''

  usuario: Usuario={
    nombre_usuario: '',
    contrasena: '',
    tipo: 2,
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    empresa: '',
    id: 0,
    id_empresa: 0
  }

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
  }

  AeaniadeUsuario(nombre_usuario: any, contrasena: any, fecha_nacimiento: any, puesto_trabajo: any){
    if(nombre_usuario=='' || contrasena=='' || puesto_trabajo==''){
      confirm("Faltan parámetros");
    }else{
      this.usuario.nombre_usuario = nombre_usuario
      this.usuario.contrasena = contrasena
      this.usuario.fecha_nacimiento = fecha_nacimiento
      this.usuario.puesto_trabajo = puesto_trabajo
      this.usuario.id_empresa = this.empresa
      console.log(this.usuario)
      this.reservasServices.AeaniadeUsuario(this.usuario, this.nombre_admi, this.empresa).subscribe(
        res => {
          let ruta = '/reservas/admi_empresa/' + this.nombre_admi + '/' + this.empresa + '/lista_usuarios'
          this.router.navigate([ruta]);
        },
        err => console.error(err)
      )
    }
  }

  
}
