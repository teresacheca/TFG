import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuarios';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-ve-reservas',
  templateUrl: './usuario-ve-reservas.component.html',
  styleUrls: ['./usuario-ve-reservas.component.css']
})
export class UsuarioVeReservasComponent {

  mis_reservas: any = []
  mis_fechas: string[] = [];
  mis_horas: string[][] = [];
  recurso: string[] = []


  vacio = false
  currentMonth: any;
  weeks: number[][] = [];
  daysOfWeek: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  usuario: Usuario = {
    nombre_usuario: '',
    contrasena: '',
    tipo: 2,
    id: 0,
    empresa: '',
    fecha_nacimiento: new Date,
    puesto_trabajo: '',
    id_empresa: 0
  }

  aux: any = []

  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  ngOnInit(){
    this.currentMonth = moment();
    const params = this.activeRoute.snapshot.params;
    this.usuario.nombre_usuario = params["nombre_usuario"]
    this.reservasServices.getUsuario(params["nombre_usuario"]).subscribe(
      res =>{
        this.aux = res
        this.usuario.nombre_usuario = this.aux[0].nombre_usuario
        this.usuario.contrasena = this.aux[0].contrasena
        this.usuario.tipo = this.aux[0].tipo
        this.usuario.id = this.aux[0].id
        this.usuario.empresa = this.aux[0].empresa   
        this.usuario.puesto_trabajo = this.aux[0].puesto_trabajo 
        this.usuario.fecha_nacimiento = this.aux[0].fecha_nacimiento  
        this.usuario.id_empresa = this.aux[0].id_empresa  
        this.getReservasUsuario()
        this.generateCalendar();
      },
      err => console.error(err)
    );
  }

  getReservasUsuario(){
    this.reservasServices.getReservasDelUsuario(this.usuario.nombre_usuario).subscribe(
      res =>{
        this.mis_reservas = res
        let fecha = '0000-00-00'
        for(const reserva of this.mis_reservas){
          let last = new Array()
          if (fecha == reserva.fecha){
            let s = reserva.nombre_rs + "<br>" + reserva.hora;

            last = last.concat(this.mis_horas[this.mis_horas.length-1])
            last = last.concat(s)
            last.sort();
            this.mis_horas[this.mis_horas.length-1] = last
          }else{
            this.mis_fechas.push(reserva.fecha);
            let s = reserva.nombre_rs + "<br>" + reserva.hora;
            last.push(s)
            this.mis_horas.push(last)
          }
          fecha = reserva.fecha
        }

      },
      err => console.error(err)
    );
  }


  verReserva(date: number, hora: string, month: string){

    let fecha = "";
    if(date < 10){
      fecha = month + '-0' + date;
    }else{
      fecha = month + '-' + date;
    }
    let partes = hora.split(">")
    let id = 0
    for(const reserva of this.mis_reservas){
      const fechaFormateadaActual =  moment(reserva.fecha).format('YYYY-MM-DD')
      if(fechaFormateadaActual == fecha && reserva.hora == partes[1]){
        id = reserva.id_reserva
      }
    }
    let ruta = this.router.url + '/ver/' + id
    this.router.navigate([ruta])
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

}

getFechasReservas(fechas: string[]): string[] {
  return fechas.map(reserva => moment(reserva).format('YYYY-MM-DD'));
}

// Verificar si hay reservas en una fecha específica y devolver un booleano
tengoReserva(date: number): boolean {
  const fecha = this.currentMonth.clone().date(date);
  const fechaFormateada = fecha.format('YYYY-MM-DD');
  return this.getFechasReservas(this.mis_fechas).includes(fechaFormateada);
}


i: number = 0

getMisHoras(date: number, month: string){
  let fecha = "";
  if (date < 10) {
    fecha = month + '-0' + date;
  } else {
    fecha = month + '-' + date;
  }

  let index = 0;
  for (const fechaReserva of this.getFechasReservas(this.mis_fechas)) {
    if (fechaReserva == fecha) {
      this.i = index;
    }
    index++;
  }
  return this.mis_horas[this.i];
}


getRecurso(date: number, month: string){
  let first: any = []
  let fecha = "";
  if(date < 10){
    fecha = month + '-0' + date;
  }else{
    fecha = month + '-' + date;
  }

  let index = 0
  for (const fechaReserva of this.getFechasReservas(this.mis_fechas)){
    if(fechaReserva == fecha){
      this.i = index
    }
    index++
  }
  first = this.recurso[this.i]
  this.i++
  if(this.i >= this.recurso.length){
    this.i = 0
  }
  

  return first
}

irAmisReservas(){
  window.location.reload();
}

verTodasLasReservas(){
  let ruta = 'reservas/usuario/' + this.usuario.nombre_usuario + '/todas_reservas'
  this.router.navigate([ruta])
}
}
