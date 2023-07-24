import { Component } from '@angular/core';
import { Recurso} from '../modelos/Recursos';
import { Reserva} from '../modelos/Reservas';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-realiza-reserva-recurso',
  templateUrl: './usuario-realiza-reserva-recurso.component.html',
  styleUrls: ['./usuario-realiza-reserva-recurso.component.css']
})
export class UsuarioRealizaReservaRecursoComponent {
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

  usuario: string = ''
  id: number = 0
  aux: any

  reserva: Reserva ={
    fecha: '',
    hora: '',
    nombre_empresa: '', 
    nombre_usuario: '',
    nombre_rs: '',
    id_reserva: 0,
    id_recursoservicio: 0,
    id_empresa: 0
  }

  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.usuario = params["nombre_usuario"]
    this.id = params["id_recursoservicio"]
    this.reservaServices.getDatosRecursoUsu(this.usuario, this.id).subscribe(
      res =>{
       this.aux = res
       console.log(res)
       this.recurso.nombre_rs = this.aux[0].nombre_rs
       this.recurso.descripcion = this.aux[0].descripcion
       this.recurso.foto = this.aux[0].foto
       this.recurso.datos = this.aux[0].datos
       this.recurso.aforo = this.aux[0].aforo
       this.recurso.nombre_empresa = this.aux[0].nombre_empresa
       this.recurso.id_recursoservicio = this.aux[0].id_recursoservicio
       this.recurso.id_empresa = this.aux[0].id_empresa

       this.reserva.nombre_empresa = this.recurso.nombre_empresa
       this.reserva.nombre_usuario = this.usuario
       this.reserva.nombre_rs = this.recurso.nombre_rs
       this.reserva.id_recursoservicio = this.recurso.id_recursoservicio
       this.reserva.id_empresa = this.recurso.id_empresa

      },
      err => console.error(err)
    );
  }

  crearReserva(nuevaReserva: Reserva){

    //Falla cuando el formato de la fecha cambia
    console.log(nuevaReserva.fecha)
    var dia = nuevaReserva.fecha.substring(0,2);
    var mes = nuevaReserva.fecha.substring(3,5);
    var anio = nuevaReserva.fecha.substring(6,12);
    console.log(dia)
    console.log(mes)
    console.log(anio)
    var fecha = mes + '-' + dia + '-' + anio
    var fechaAuxiliar = anio + '-' + mes + '-' + dia
    nuevaReserva.fecha = fechaAuxiliar
    console.log(fecha)
    const f = new Date(fecha)
    f.setDate(f.getDate()+1)
    console.log("f")
    console.log(f)
    //cosas para tener 2023-01-23
    var str = f.toString();
    var mes_str = str.substring(4,7);
    var mes = '';
   
    switch(mes_str){
      case 'Jan':{
        mes = '01';
        break;
      }
      case 'Feb':{
        mes = '02';
        break;
      }
      case 'Mar':{
        mes = '03';
        break;
      }
      case 'Apr':{
        mes = '04';
        break;
      }
      case 'May':{
        mes = '05';
        break;
      }
      case 'Jun':{
        mes = '06';
        break;
      }
      case 'Jul':{
        mes = '07';
        break;
      }
      case 'Aug':{
        mes = '08';
        break;
      }
      case 'Sep':{
        mes = '09';
        break;
      }
      case 'Oct':{
        mes = '10';
        break;
      }
      case 'Nov':{
        mes = '11';
        break;
      }
      case 'Dec':{
        mes = '12';
        break;
      }
    }
  
    var dia = str.substring(8,10);
    var anio = str.substring(11,15);
  
    var nueva_fecha = anio + '-' + mes + '-' + dia;

    console.log(nueva_fecha)


    let existe = false
    let coincide = false
    this.reservaServices.getRecursos(this.usuario, this.recurso.id_empresa).subscribe(
      res =>{
        this.aux = res
        for(let i=0; i<this.aux.length; i++){
          if(nuevaReserva.nombre_rs == this.aux[i].nombre_rs){
            existe = true
          }
        }

        if(existe == false){
          confirm("El recurso no existe");
        }else{

          this.reservaServices.getReservasEmpresa(this.usuario, this.recurso.id_empresa).subscribe(
            res =>{
              this.aux = res
              
              for(let i=0; i<this.aux.length; i++){
                var x = this.aux[i].fecha.toString().substring(0,10);
                console.log("fechas")
                  console.log(x)
                  console.log(nuevaReserva.fecha)
                if(nuevaReserva.nombre_rs == this.aux[i].nombre_rs && nuevaReserva.fecha == x && nuevaReserva.hora == this.aux[i].hora ){
                  coincide = true
                }
              }
              if(coincide){
                confirm("Ya existe una reserva en ese momento para dicho recurso");
              }else{
                nuevaReserva.fecha = nueva_fecha
                this.reservaServices.crearReserva(this.usuario, this.id, nuevaReserva).subscribe(
                  res =>{
                    let ruta = '/reservas/usuario/' + this.usuario + '/realiza_reserva'
                    this.router.navigate([ruta])
                  },
                  err => console.error(err)
                );
              }
            },
            err => console.error(err)
          );          
        }
      },
      err => console.error(err)
    );
  }
}
