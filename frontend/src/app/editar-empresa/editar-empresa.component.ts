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

  //Objeto de tipo empresa donde guardaremos los datos de la empresa con el que estamos operando
  empresa: Empresa={
    nombre_empresa: '',
    datos_de_contacto: '',
    descripcion: '',
    logo: '',
    direccion: '',
    id_empresa: 0
  }

  //Resto de variables que usaremos en el código
  id_empresa: number = 0
  nombre_admi:string = ""
  aux: any = {  }
  nombre_empresa = ""

  ngOnInit(){
    //Cogemos los parámetros que se leen en la url
    const params = this.activeRoute.snapshot.params;
    this.id_empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]

    //Obtenemos los datos de la empresa que editar a partir de su identificador
    //Necesitamos el nombre del administrador para llamarlo en la url
    this.reservaServices.getEmpresaId(this.nombre_admi, params["id_empresa"]).subscribe(
      res => {
        //Guardamos los datos obtenidos en empresa
        this.aux = res
        this.empresa.nombre_empresa = this.aux[0].nombre_empresa
        this.empresa.datos_de_contacto = this.aux[0].datos_de_contacto
        this.empresa.descripcion = this.aux[0].descripcion
        this.empresa.logo = this.aux[0].logo
        this.empresa.direccion = this.aux[0].direccion
        this.empresa.id_empresa = this.aux[0].id_empresa
        this.nombre_empresa = this.empresa.nombre_empresa
      },
      err=> console.error(err)
    )
  }

  //Función que llama a la función para borrar la instancia de la empresa de la base de datos
  eliminarCuentaEmpresa(id_empresa: number){
    //Borramos la empresa de la base de datos
    this.reservaServices.eliminarEmpresa(this.nombre_admi, id_empresa).subscribe(
      res => {
        //Nos movemos a la página que muestra la lista de las empresas
        let ruta = '/reservas/' + this.nombre_admi + '/empresas/'
        this.router.navigate([ruta]);
      },
      err => console.error(err)
    )
  }

  //Función que guarda los datos modificados de la empresa
  guardarCambios(id_empresa: number, empresa : Empresa){
    this.reservaServices.guardarCambios(this.nombre_admi, id_empresa, empresa).subscribe(
      res => {
        //Si el nombre de la empresa cambia, tenemos que cambiar los datos que se vean afectados el resto de entidades
        if(this.nombre_empresa != empresa.nombre_empresa){
          //Actualizamos los datos de los administradores de la empresa
          this.reservaServices.getAdministradoresEmpresa(this.nombre_admi, id_empresa).subscribe(
            res => {
              this.aux =res
              for(const admi of this.aux){
                let nuevoAdmi = admi
                nuevoAdmi.empresa = empresa.nombre_empresa
                this.reservaServices.guardarCambiosAdmiEmpresa(this.nombre_admi, nuevoAdmi.id, id_empresa, nuevoAdmi).subscribe(
                  res => {
                   //No hacemos nada cuando se actualiza el administrador
            
                  },
                  err=> console.error(err)
                )
              }
            },
            err=> console.error(err)
          )
          //Actualizamos los datos de los usaurios de la empresa
          this.reservaServices.getUsuariosEmpresa(this.nombre_admi, id_empresa).subscribe(
            res => {
              this.aux =res
              for(const usuario of this.aux){
                let nuevoUsuario = usuario
                nuevoUsuario.empresa = empresa.nombre_empresa
                this.reservaServices.guardarCambiosUsuarioAe(this.nombre_admi, id_empresa, nuevoUsuario.id, nuevoUsuario).subscribe(
                  res => {
                   //No hacemos nada cuando se actualiza el usuario
            
                  },
                  err=> console.error(err)
                )
              }
              
      
            },
            err=> console.error(err)
          )
          //Actualizamos los datos de las reservas
          this.reservaServices.getReservasEmpresa(this.nombre_admi, id_empresa).subscribe(
            res => {
              this.aux =res
              for(const reserva of this.aux){
                let nuevaReserva = reserva
                nuevaReserva.nombre_empresa = empresa.nombre_empresa
                this.reservaServices.actualizarReserva(this.nombre_admi, id_empresa, nuevaReserva.id_reserva, nuevaReserva).subscribe(
                  res => {
                   //No hacemos nada cuando se actualiza la reserva
            
                  },
                  err=> console.error(err)
                )
              }
              
      
            },
            err=> console.error(err)
          )
          //Actualizamos los datos de los recursos o servicio
          this.reservaServices.getRecursosAe(this.nombre_admi, id_empresa).subscribe(
            res => {
              this.aux =res
              for(const recurso of this.aux){
                let nuevoRecurso = recurso
                nuevoRecurso.nombre_empresa = empresa.nombre_empresa
                this.reservaServices.guardarCambiosRecursoAe(this.nombre_admi, id_empresa, nuevoRecurso.id_recursoservicio, nuevoRecurso).subscribe(
                  res => {
                   //No hacemos nada cuando se actualiza el recurso o servicio
            
                  },
                  err=> console.error(err)
                )
              }
              
      
            },
            err=> console.error(err)
          )
        }
        //Nos movemos a la página que muestra la pantalla principal de la empresa
        let ruta = '/reservas/' + this.nombre_admi + '/empresas/'+ this.empresa.id_empresa
        this.router.navigate([ruta ]);

      },
      err=> console.error(err)
    )
  }

  //Función que nos permite volver a la página anterior, es decir, a la página que nos muestra la lista de las empresas
  volver(){
    let ruta = '/reservas/' + this.nombre_admi + '/empresas/' + this.id_empresa 
    this.router.navigate([ruta])
  }
}
