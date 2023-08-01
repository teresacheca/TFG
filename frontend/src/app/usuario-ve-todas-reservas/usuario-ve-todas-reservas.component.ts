import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelos/Usuarios';
import * as moment from 'moment';

@Component({
  selector: 'app-usuario-ve-todas-reservas',
  templateUrl: './usuario-ve-todas-reservas.component.html',
  styleUrls: ['./usuario-ve-todas-reservas.component.css']
})
export class UsuarioVeTodasReservasComponent {

  reservas_empresa: any = []
  todas_las_fechas: string[] = [];
  todas_las_horas: string[][] = [];
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
        this.getReservasEmpresa()
        this.generateCalendar();
      },
      err => console.error(err)
    );
  }


  getReservasEmpresa(){
    this.reservasServices.getReservasEmpresa(this.usuario.nombre_usuario, this.usuario.id_empresa).subscribe(
      res =>{
        this.reservas_empresa = res

        let fecha = '0000-00-00'
        for(const reserva of this.reservas_empresa){
          let last = new Array()
          if (fecha == reserva.fecha){
            last = last.concat(this.todas_las_horas[this.todas_las_horas.length-1])
            last = last.concat(reserva.hora)
            last.sort();
            this.todas_las_horas[this.todas_las_horas.length-1] = last
          }else{
            this.todas_las_fechas.push(reserva.fecha);
            last.push(reserva.hora)
            this.todas_las_horas.push(last)
            this.recurso.push(reserva.nombre_rs)
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

    let id = 0
    for(const reserva of this.reservas_empresa){
      const fechaFormateadaActual =  moment(reserva.fecha).format('YYYY-MM-DD')
      if(fechaFormateadaActual == fecha && reserva.hora == hora){
        id = reserva.id_reserva
      }
    }
    let ruta = '/reservas/usuario/' + this.usuario.nombre_usuario + '/reservas/ver/' + id
    this.router.navigate([ruta])
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
    for (const fechaReserva of this.getFechasReservas(this.todas_las_fechas)){
      if(fechaReserva == fecha){
        this.j = index
      }
      index++
    }
    first = this.recurso[this.j]
    this.j++
    if(this.j >= this.recurso.length){
      this.j = 0
    }
    
  
    return first
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

getFormattedDate(day: number): string {
  const year = this.currentMonth.year();
  const month = this.currentMonth.month() + 1;
  const dayFormatted = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${month < 10 ? `0${month}` : `${month}`}-${dayFormatted}`;
}

getFechasReservas(fechas: string[]): string[] {
  return fechas.map(reserva => moment(reserva).format('YYYY-MM-DD'));
}


tienenReserva(date: number): boolean {
  const fecha = this.currentMonth.clone().date(date);
  const fechaFormateada = fecha.format('YYYY-MM-DD');
  return this.getFechasReservas(this.todas_las_fechas).includes(fechaFormateada);
}

j: number = 0


getTodasLasHoras(date: number, month: string){
  let first: any = []
  let fecha = "";
  if(date < 10){
    fecha = month + '-0' + date;
  }else{
    fecha = month + '-' + date;
  }

  let index = 0
  for (const fechaReserva of this.getFechasReservas(this.todas_las_fechas)){
    if(fechaReserva == fecha){
      this.j = index
    }
    index++
  }
  first = this.todas_las_horas[this.j]
  this.j++
  if(this.j >= this.todas_las_horas.length){
    this.j = 0
  }
  

  return first
}


irAmisReservas(){
  let ruta = 'reservas/usuario/' + this.usuario.nombre_usuario + '/reservas'
  this.router.navigate([ruta])
}

verTodasLasReservas(){
  
  window.location.reload();
}
}
