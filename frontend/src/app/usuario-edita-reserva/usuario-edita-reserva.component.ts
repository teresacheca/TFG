import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva} from 'src/app/modelos/Reservas';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-edita-reserva',
  templateUrl: './usuario-edita-reserva.component.html',
  styleUrls: ['./usuario-edita-reserva.component.css']
})
export class UsuarioEditaReservaComponent {
  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  reserva: Reserva = {
    fecha: '',
    hora: '',
    nombre_empresa: '', 
    nombre_usuario: '',
    nombre_rs: '',
    id_reserva: 0,
    id_recursoservicio: 0,
    id_empresa: 0
  }

  empresa: number = 0
  usuario: string = ''
  id: number = 0
  aux: any= []
  fecha: any
  ngOnInit(){
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.usuario = params["nombre_usuario"]
    this.id = params["id_reserva"]
    
    this.reservasServices.getReservaIdUsu(this.usuario, this.id).subscribe(
      res =>{
        console.log(res)
        this.aux = res
        this.reserva.fecha = this.aux[0].fecha
        this.fecha = moment(this.reserva.fecha).format('YYYY-MM-DD')
        this.reserva.hora = this.aux[0].hora
        this.reserva.nombre_empresa = this.aux[0].nombre_empresa
        this.reserva.nombre_usuario = this.aux[0].nombre_usuario
        this.reserva.nombre_rs = this.aux[0].nombre_rs
        this.reserva.id_reserva = this.aux[0].id_reserva
        this.reserva.id_recursoservicio = this.aux[0].id_recursoservicio
        this.reserva.id_empresa = this.aux[0].id_empresa

      },
      err => console.error(err)
    );
  }


  guardaCambiosReservaUsu(id_reserva: number, nuevaReserva: Reserva, fecha:string){
    console.log(id_reserva)
    console.log(nuevaReserva)

    const faux = new Date(fecha)
   
    var straux = faux.toString();
    var mes_str_aux = straux.substring(4,7);
    var mesAux = ''
 
    switch(mes_str_aux){
      case 'Jan':{
        mesAux = '01';
        break;
      }
      case 'Feb':{
        mesAux = '02';
        break;
      }
      case 'Mar':{
        mesAux = '03';
        break;
      }
      case 'Apr':{
        mesAux = '04';
        break;
      }
      case 'May':{
        mesAux = '05';
        break;
      }
      case 'Jun':{
        mesAux = '06';
        break;
      }
      case 'Jul':{
        mesAux = '07';
        break;
      }
      case 'Aug':{
        mesAux = '08';
        break;
      }
      case 'Sep':{
        mesAux = '09';
        break;
      }
      case 'Oct':{
        mesAux = '10';
        break;
      }
      case 'Nov':{
        mesAux = '11';
        break;
      }
      case 'Dec':{
        mesAux = '12';
        break;
      }
    }
    
    
    var diaAux = straux.substring(8,10);
    var anioAux = straux.substring(11,15);

    
    var fechaAuxiliar = anioAux + '-' + mesAux + '-' + diaAux;

    console.log(fechaAuxiliar)

    let existe = false
    let coincide = false
    this.reservasServices.getRecursos(this.usuario, this.reserva.id_empresa).subscribe(
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

          this.reservasServices.getReservasEmpresa(this.usuario, this.reserva.id_empresa).subscribe(
            res =>{
              this.aux = res
              
              for(let i=0; i<this.aux.length; i++){
                var x = this.aux[i].fecha.toString().substring(0,10);
                console.log("x")
                const x2 = new Date(x)
               
                x2.setDate(x2.getDate()+1)

                var str = x2.toString();
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

                var nueva_fechax = anio + '-' + mes + '-' + dia;

                console.log(this.aux[i].id_reserva)
                console.log(fechaAuxiliar)
                console.log(nueva_fechax)
                if(nuevaReserva.nombre_rs == this.aux[i].nombre_rs && fechaAuxiliar == nueva_fechax && nuevaReserva.hora == this.aux[i].hora ){
                  console.log("!!")
                  coincide = true
                }
              }
              if(coincide){
                confirm("Ya existe una reserva en ese momento para dicho recurso");
              }else{
                nuevaReserva.fecha = fechaAuxiliar
                this.reservasServices.guardaCambiosReservaUsu(this.usuario, id_reserva, nuevaReserva).subscribe(
                  res => {
                    let ruta = '/reservas/usuario/' + this.usuario + '/reservas'
                    this.router.navigate([ruta]);
                  },
                  err=> console.error(err)
                )
              }
            },
            err => console.error(err)
          );          
        }
      },
      err => console.error(err)
    );

    
  }

  eliminaReservaUsu(id_reserva: number){
    this.reservasServices.eliminaReservaUsu(this.usuario, id_reserva).subscribe(
      res => {
        let ruta = '/reservas/usuario/' + this.usuario + '/reservas'
        this.router.navigate([ruta]);
      },
      err=> console.error(err)
    )
  }
}
