import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; //para hacer peticiones http

import {Reserva} from '../modelos/Reservas' ///importar la interfaz
import {Empresa} from '../modelos/Empresas' ///importar la interfaz
import {Usuario} from '../modelos/Usuarios' ///importar la interfaz

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http:HttpClient) { }

  getLogin(nombre: string, contrasena: string){  //comprueba si existe el usuario
    return this.http.get(`${this.API_URI}/reservas/${nombre}/${contrasena}`);
  }

  getReservas(){ //devuelve todas las reservas
    return this.http.get(`${this.API_URI}/reservas`)
  }

  getReserva(fecha: string){ //devuelve una reserva
    return this.http.get(`${this.API_URI}/reservas/${fecha}`);
  }

  saveReserva(reserva: Reserva){  //guardar una reserva
    return this.http.post(`${this.API_URI}/reservas`, reserva);
  }

  deleteReserva(fecha: string){ //borrar una reserva
    return this.http.delete(`${this.API_URI}/reservas/${fecha}`);
  }

  updateReserva(fecha: string|number, updatedReserva: Reserva){  //actualizar una reserva
    return this.http.put(`${this.API_URI}/reservas/${fecha}`, updatedReserva);
  }

  crearSolicitud(empresa: Empresa){  
    return this.http.post(`${this.API_URI}/reservas/empresas/${empresa.nombre_empresa}`, empresa);
  }

  getEmpresas(){ //devuelve una reserva
    return this.http.get(`${this.API_URI}/reservas/empresas`);
  }

  getSolicitudes(){ //devuelve una reserva
    console.log("sol")
    return this.http.get(`${this.API_URI}/reservas/lista_solicitudes`); //da error
  }

  getEmpresa(empresa : string){ //devuelve una reserva
    return this.http.get(`${this.API_URI}/reservas/empresas/${empresa}`);
  }

  eliminarEmpresa(empresa : string){ //devuelve una reserva
    console.log("1")
    return this.http.delete(`${this.API_URI}/reservas/empresas/eliminar/${empresa}`);
  }

  guardarCambios(empresa : string, nueva: Empresa){ //devuelve una reserva
    return this.http.put(`${this.API_URI}/reservas/empresas/cambiar/${empresa}`, nueva);
  }

  getAdministradoresEmpresa(nombre_empresa: string){ //devuelve todas las reservas
    return this.http.get(`${this.API_URI}/reservas/empresas/${nombre_empresa}/lista_administradores`)
  }

  getUsuariosEmpresa(nombre_empresa: string){ //devuelve todas las reservas
    return this.http.get(`${this.API_URI}/reservas/empresas/${nombre_empresa}/lista_usuarios`)
  }

  getAdministradorEmpresa(id: number, empresa: string){ //devuelve todas las reservas
    return this.http.get(`${this.API_URI}/reservas/empresas/${empresa}/lista_administradores/${id}`)
  }

  eliminarCuentaAdmiEmpresa(id: number, empresa: string){ //devuelve todas las reservas
    return this.http.delete(`${this.API_URI}/reservas/empresas/${empresa}/lista_administradores/${id}/eliminar`)
  }

  guardarCambiosAdmiEmpresa(id: number, empresa: string, nuevoAdmi: Usuario){ //devuelve todas las reservas
    return this.http.put(`${this.API_URI}/reservas/empresas/${empresa}/lista_administradores/${id}`, nuevoAdmi)
  }
  getSolicitud(id: number){
    return this.http.get(`${this.API_URI}/reservas/lista_solicitudes/${id}`);
  }

  nuevaEmpresa(id_solicitud: number, nombre_empresa: string, empresa: Empresa){  
    return this.http.post(`${this.API_URI}/reservas/lista_solicitudes/${id_solicitud}/${nombre_empresa}`, empresa);
  }

  eliminarSolicitud(id_solicitud: number){  
    return this.http.delete(`${this.API_URI}/reservas/lista_solicitudes/${id_solicitud}/eliminar`);
  }

  getUsuarioag(nombre_empresa: string, nombre_usuario: string){ 
    return this.http.get(`${this.API_URI}/reservas/empresas/${nombre_empresa}/lista_usuarios/${nombre_usuario}`);
  }
  
}
