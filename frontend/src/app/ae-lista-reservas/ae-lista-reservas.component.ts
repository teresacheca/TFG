import { Component } from '@angular/core';
import {ReservasService} from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-ae-lista-reservas',
  templateUrl: './ae-lista-reservas.component.html',
  styleUrls: ['./ae-lista-reservas.component.css']
})
export class AeListaReservasComponent {
  reservas: any = []
  vacio = false
  empresa: number = 0
  nombre_admi: string = ''

  currentMonth: any;
  weeks: number[][] = [];
  daysOfWeek: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  aux: any = []

  fechasExistentes: string[] = [];
  horas: string[][] = [];
  recurso: string[] = []

  constructor(private reservasServices: ReservasService, private router: Router, private activeRoute: ActivatedRoute){}

  ngOnInit(){
    this.currentMonth = moment();
    const params = this.activeRoute.snapshot.params;
    this.empresa = params["id_empresa"]
    this.nombre_admi = params["nombre_usuario"]
    this.reservasServices.getReservasAe(this.nombre_admi, this.empresa).subscribe(
      res =>{
        this.reservas = res;
        if(this.reservas.length == 0){
          this.vacio = true
        }

        let fecha = '0000-00-00'
        for(const reserva of this.reservas){
          let last = new Array()
          if (fecha == reserva.fecha){
            last = last.concat(this.horas[this.horas.length-1])
            last = last.concat(reserva.hora)
            last.sort();
            this.horas[this.horas.length-1] = last
          }else{
            this.fechasExistentes.push(reserva.fecha);
            last.push(reserva.hora)
            this.horas.push(last)
            this.recurso.push(reserva.nombre_rs)
          }
          fecha = reserva.fecha
        }

        this.generateCalendar();

      },
      err => console.error(err)
    );
  }

  veReservaAe(date: number, hora: string, month: string){

    let fecha = "";
    if(date < 10){
      fecha = month + '-0' + date;
    }else{
      fecha = month + '-' + date;
    }

    let id = 0
    for(const reserva of this.reservas){
      const fechaFormateadaActual =  moment(reserva.fecha).format('YYYY-MM-DD')
      if(fechaFormateadaActual == fecha && reserva.hora == hora){
        id = reserva.id_reserva
      }
    }
    let ruta = this.router.url + '/' + id
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
    return this.getFechasReservas(this.fechasExistentes).includes(fechaFormateada);
  }
  

  i: number = 0

getHoras(date: number, month: string){
  let first: any = []
  let fecha = "";
  if(date < 10){
    fecha = month + '-0' + date;
  }else{
    fecha = month + '-' + date;
  }

  let index = 0
  for (const fechaReserva of this.getFechasReservas(this.fechasExistentes)){
    if(fechaReserva == fecha){
      this.i = index
    }
    index++
  }
  first = this.horas[this.i]
  this.i++
  if(this.i >= this.horas.length){
    this.i = 0
  }
  

  return first
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
  for (const fechaReserva of this.getFechasReservas(this.fechasExistentes)){
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

}
