import { Component } from '@angular/core';
import { Recurso} from '../modelos/Recursos';
import { Reserva} from '../modelos/Reservas';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-realiza-reserva-recurso',
  templateUrl: './usuario-realiza-reserva-recurso.component.html',
  styleUrls: ['./usuario-realiza-reserva-recurso.component.css']
})


export class UsuarioRealizaReservaRecursoComponent {
  constructor(private reservaServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  currentMonth: any;
  weeks: number[][] = [];
  daysOfWeek: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  reservasExistente: string[] = [];
  horas: string[] = [];

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
    this.currentMonth = moment();
    this.generateCalendar();
    const params = this.activeRoute.snapshot.params;
    this.usuario = params["nombre_usuario"]
    this.id = params["id_recursoservicio"]
    this.reservaServices.getDatosRecursoUsu(this.usuario, this.id).subscribe(
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

       this.reserva.nombre_empresa = this.recurso.nombre_empresa
       this.reserva.nombre_usuario = this.usuario
       this.reserva.nombre_rs = this.recurso.nombre_rs
       this.reserva.id_recursoservicio = this.recurso.id_recursoservicio
       this.reserva.id_empresa = this.recurso.id_empresa

       this.reservaServices.getReservasEmpresa(this.usuario, this.recurso.id_empresa).subscribe(
        res =>{
          this.aux = res;
          for (const reserva of this.aux) {
            this.reservasExistente.push(reserva.fecha);
            this.horas.push(reserva.hora)
          }
          console.log(this.reservasExistente)
          console.log(this.horas)
        },
        err => console.error(err)
      );

      },
      err => console.error(err)
    );

    
  }

  crearReserva(nuevaReserva: Reserva){


    const faux = new Date(nuevaReserva.fecha)
   
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


  get currentMonthDates(): number[] {
      const firstDayOfMonth = this.currentMonth.clone().startOf('month').day();
      const daysInMonth = this.currentMonth.daysInMonth();
      const dates = Array.from({ length: 42 }, (_, i) =>
        i >= firstDayOfMonth && i < firstDayOfMonth + daysInMonth
          ? i - firstDayOfMonth + 1
          : 0
      );
      return dates;
  }

  goToPreviousMonth() {
    this.currentMonth = this.currentMonth.clone().subtract(1, 'month');
    this.generateCalendar();
  }

  goToNextMonth() {
    this.currentMonth = this.currentMonth.clone().add(1, 'month');
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDayOfMonth = this.currentMonth.clone().startOf('month').day();
    const daysInMonth = this.currentMonth.daysInMonth();
    const weeks = [];

    let week = new Array(7).fill(0);

    let currentDay = 1;
    for (let i = firstDayOfMonth-1; i < 7; i++) {
      week[i] = currentDay;
      currentDay++;
    }

    weeks.push(week);

    while (currentDay <= daysInMonth) {
      week = new Array(7).fill(0);
      for (let i = 0; i < 7 && currentDay <= daysInMonth; i++) {
        week[i] = currentDay;
        currentDay++;
      }
      weeks.push(week);
    }

    this.weeks = weeks;

    console.log(this.weeks)
  }

  getFormattedDate(day: number): string {
    const year = this.currentMonth.year();
    const month = this.currentMonth.month() + 1;
    const dayFormatted = day < 10 ? `0${day}` : `${day}`;
    return `${year}-${month < 10 ? `0${month}` : `${month}`}-${dayFormatted}`;
  }

  getFechasReservas(): string[] {
    return this.reservasExistente.map(reserva => moment(reserva).format('YYYY-MM-DD'));
  }

  // Verificar si hay reservas en una fecha específica y devolver un booleano
  tieneReserva(date: number): boolean {
    const fecha = this.currentMonth.clone().date(date);
    const fechaFormateada = fecha.format('YYYY-MM-DD');
    return this.getFechasReservas().includes(fechaFormateada);
  }

  getFechasReservasConHora(): { fecha: string; hora: string }[] {
    return this.reservasExistente.map(reserva => ({
      fecha: moment(reserva).format('YYYY-MM-DD'),
      hora: moment(reserva).format('HH:mm:ss')
    }));
  }

  // Obtener la hora de la reserva en una fecha específica o cadena vacía si no hay reserva
  getHoraReserva(date: number): string {
    const fecha = this.currentMonth.clone().date(date);
    const fechaFormateada = fecha.format('YYYY-MM-DD');
    const reserva = this.getFechasReservasConHora().find(reserva => reserva.fecha === fechaFormateada);
    return reserva ? reserva.hora : '';
  }
}
