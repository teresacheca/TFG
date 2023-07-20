import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; //para hacer peticiones http

import {Reserva} from '../modelos/Reservas' ///importar la interfaz
import {Empresa} from '../modelos/Empresas' ///importar la interfaz
import {Usuario} from '../modelos/Usuarios' ///importar la interfaz
import {Recurso} from '../modelos/Recursos'

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  API_URI = 'http://localhost:3000/api'

  constructor(private http:HttpClient) { }

  getLogin(nombre: string, contrasena: string){  //comprueba si existe el usuario
    return this.http.get(`${this.API_URI}/reservas/${nombre}/${contrasena}`);
  }

  getReservas(){ 
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

  getAdministradoresEmpresa(nombre_empresa: string){ 
    return this.http.get(`${this.API_URI}/reservas/empresas/${nombre_empresa}/lista_administradores`)
  }

  getUsuariosEmpresa(nombre_empresa: string){ 
    return this.http.get(`${this.API_URI}/reservas/empresas/${nombre_empresa}/lista_usuarios`)
  }

  getAdministradorEmpresa(nombre_usuario: string, nombre_empresa: string){ 
    return this.http.get(`${this.API_URI}/reservas/empresas/${nombre_empresa}/lista_administradores/${nombre_usuario}`)
  }

  eliminarCuentaAdmiEmpresa(id: number, empresa: string){ 
    return this.http.delete(`${this.API_URI}/reservas/empresas/${empresa}/lista_administradores/${id}/eliminar`)
  }

  guardarCambiosAdmiEmpresa(id: number, empresa: string, nuevoAdmi: Usuario){ 
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
  
  getUsuarioNombre(nombre: string){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre}/get`)
  }

  getDatosAdministradorEmpresa(nombre_usuario: string, nombre_empresa: string){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/editar`)
  }

  guardarCambiosAdmiEmpresaAe(nombre_usuario: string, nuevoAdmi: Usuario){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/editar/guardar`, nuevoAdmi)
  }

  eliminarCuentaAdmiEmpresaAe(nombre_usuario: string){ 
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/editar/eliminar`)
  }

  getUsuariosEmpresaAe(nombre_usuario: string, nombre_empresa: string){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/${nombre_empresa}/lista_usuarios`)
  }

  getUsuarioId(nombre_usuario: string, nombre_empresa: string, id: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/${nombre_empresa}/lista_usuarios/${id}`)
  }

  guardarCambiosUsuarioAe(nombre_admi: string, nombre_empresa: string, id: number, nuevoUsuario: Usuario){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_usuarios/${id}/editar`, nuevoUsuario)
  }

  eliminarCuentaUsuarioAe(nombre_admi: string, nombre_empresa: string, id: number){
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_usuarios/${id}/eliminar`)
  }

  AeaniadeUsuario(usuario: Usuario, nombre_admi: string, nombre_empresa: string){
    return this.http.post(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_usuarios/aniade/guardar`, usuario)
  }

  getRecursosAe(nombre_admi: string, nombre_empresa: string){
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_recursos/get`)
  }
  
  getDatosRecursoAe(nombre_admi: string, nombre_empresa: string, id_recursoservicio: number){
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_recursos/${id_recursoservicio}`)
  }

  guardarCambiosRecursoAe(nombre_admi: string, nombre_empresa: string, id_recursoservicio: number, nuevoRecurso: Recurso){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_recursos/${id_recursoservicio}/editar`, nuevoRecurso)
  }

  eliminarRescursoAe(nombre_admi: string, nombre_empresa: string, id_recursoservicio: number){ 
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_recursos/${id_recursoservicio}/eliminar`)
  }

  AeaniadeRecurso(nuevoRecurso: Recurso, nombre_admi: string, nombre_empresa: string){ 
    return this.http.post(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_recursos/aniade/guardar`, nuevoRecurso)
  }

  getReservasAe(nombre_admi: string, nombre_empresa: string){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_reservas/get`)
  }

  getReservaId(nombre_admi: string, nombre_empresa: string, id_reserva: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_reservas/${id_reserva}`)
  }

  AeguardaCambiosReserva(nombre_admi: string, nombre_empresa: string, id_reserva: number, nuevaReserva: Reserva){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_reservas/${id_reserva}/editar/guardar`, nuevaReserva)
  }

  AeEliminaReserva(nombre_admi: string, nombre_empresa: string, id_reserva: number){ 
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${nombre_empresa}/lista_reservas/${id_reserva}/eliminar`)
  }

  getUsuario(nombre_usuario: string){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/editar`)
  }

  guardarCambiosUsuario(nombre_usuario: string, nuevoUsuario: Usuario){
    console.log(nombre_usuario)
    return this.http.put(`${this.API_URI}/reservas/usuario/${nombre_usuario}/editar/guardar`, nuevoUsuario)
  }

}
