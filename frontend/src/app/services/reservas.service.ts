import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; //para hacer peticiones http

import {Reserva} from '../modelos/Reservas' ///importar la interfaz
import {Empresa} from '../modelos/Empresas' ///importar la interfaz
import {Usuario} from '../modelos/Usuarios' ///importar la interfaz
import {Recurso} from '../modelos/Recursos'
import {Solicitud} from '../modelos/Solicitud'

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

  crearSolicitud(nombre_usuario: string, empresa: Empresa){  
    return this.http.post(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${empresa.nombre_empresa}`, empresa);
  }

  getEmpresas(nombre_usuario: string){ //devuelve una reserva
    console.log(nombre_usuario)
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas`);
  }

  getSolicitudes(nombre_usuario: string){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes`); 
  }
  getSolicitudesAceptadas(nombre_usuario: string){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/aceptadas`); 
  }
  getSolicitudesRechazadas(nombre_usuario: string){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/rechazadas`); 
  }
  getSolicitudesPendientes(nombre_usuario: string){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/pendientes`); 
  }

  getEmpresa(nombre_usuario: string, empresa : string){
    console.log(empresa)
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${empresa}`);
  }
  getEmpresaId(nombre_usuario: string,id_empresa : number){
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/id`);
  }

  eliminarEmpresa(nombre_usuario: string,id_empresa : number){ //devuelve una reserva
    return this.http.delete(`${this.API_URI}/reservas/${nombre_usuario}/empresas/eliminar/${id_empresa}`);
  }

  guardarCambios(nombre_usuario: string, id_empresa : number, nueva: Empresa){
    return this.http.put(`${this.API_URI}/reservas/${nombre_usuario}/empresas/cambiar/${id_empresa}`, nueva);
  }

  getAdministradoresEmpresa(nombre_usuario: string,id_empresa: number){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_administradores`)
  }

  getUsuariosEmpresa(nombre_usuario: string, id_empresa: number){ 
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_usuarios`)
  }

  getAdministradorEmpresa(nombre_usuario: string, id: number, id_empresa: number){
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_administradores/${id}`)
  }

  eliminarCuentaAdmiEmpresa(nombre_usuario: string, id: number, id_empresa: number){ 
    return this.http.delete(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_administradores/${id}/eliminar`)
  }

  guardarCambiosAdmiEmpresa(nombre_usuario: string, id: number, id_empresa: number, nuevoAdmi: Usuario){ 
    return this.http.put(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_administradores/${id}`, nuevoAdmi)
  }
  getSolicitud(nombre_usuario: string,id: number){
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/${id}`);
  }

  nuevaEmpresa(nombre_usuario: string,id_solicitud: number, nombre_empresa: string, empresa: Empresa){  
    return this.http.post(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/${id_solicitud}/${nombre_empresa}`, empresa);
  }

  eliminarSolicitud(nombre_usuario: string,id_solicitud: number){  
    return this.http.delete(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/${id_solicitud}/eliminar`);
  }

  actualizarSolicitud(nombre_usuario: string,id_solicitud: number, nuevaSolicitud: Solicitud){  
    return this.http.put(`${this.API_URI}/reservas/${nombre_usuario}/lista_solicitudes/${id_solicitud}/actualizar`, nuevaSolicitud);
  }

  getUsuarioag(id_empresa: number, id:number, nombre_usuario: string){ //soliucionar
    return this.http.get(`${this.API_URI}/reservas/${nombre_usuario}/empresas/${id_empresa}/lista_usuarios/${id}`);
  }
  
  getUsuarioNombre(nombre: string){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre}/get`)
  }

  getDatosAdministradorEmpresa(nombre_usuario: string, id_empresa: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/editar`)
  }

  guardarCambiosAdmiEmpresaAe(nombre_usuario: string, nuevoAdmi: Usuario){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/editar/guardar`, nuevoAdmi)
  }

  eliminarCuentaAdmiEmpresaAe(nombre_usuario: string){ 
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/editar/eliminar`)
  }

  getUsuariosEmpresaAe(nombre_usuario: string, id_empresa: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/${id_empresa}/lista_usuarios`)
  }

  getUsuarioId(nombre_usuario: string, id_empresa: number, id: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/${id_empresa}/lista_usuarios/${id}`)
  }

  guardarCambiosUsuarioAe(nombre_admi: string, id_empresa: number, id: number, nuevoUsuario: Usuario){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_usuarios/${id}/editar`, nuevoUsuario)
  }

  eliminarCuentaUsuarioAe(nombre_admi: string, id_empresa: number, id: number){
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_usuarios/${id}/eliminar`)
  }

  eliminarReservas(nombre_admi: string, id_empresa: number, id_reserva:number){
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_usuarios/${id_reserva}/eliminar_reserva`)
  }

  eliminarReservasUsuario(nombre_usuario: string, id_empresa: number){
    console.log("entrs")
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_usuario}/${id_empresa}/eliminar_reservas_usuario`)
  }

  AeaniadeUsuario(usuario: Usuario, nombre_admi: string, id_empresa: number){
    return this.http.post(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_usuarios/aniade/guardar`, usuario)
  }

  getRecursosAe(nombre_admi: string, id_empresa: number){
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_recursos/get`)
  }
  
  getDatosRecursoAe(nombre_admi: string, id_empresa: number, id_recursoservicio: number){
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_recursos/${id_recursoservicio}`)
  }

  guardarCambiosRecursoAe(nombre_admi: string, id_empresa: number, id_recursoservicio: number, nuevoRecurso: Recurso){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_recursos/${id_recursoservicio}/editar`, nuevoRecurso)
  }

  eliminarRescursoAe(nombre_admi: string, id_empresa: number, id_recursoservicio: number){ 
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_recursos/${id_recursoservicio}/eliminar`)
  }

  AeaniadeRecurso(nuevoRecurso: Recurso, nombre_admi: string, id_empresa: number){ 
    return this.http.post(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_recursos/aniade/guardar`, nuevoRecurso)
  }

  getReservasAe(nombre_admi: string, id_empresa: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_reservas/get`)
  }

  getReservaId(nombre_admi: string, id_empresa: number, id_reserva: number){ 
    return this.http.get(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_reservas/${id_reserva}`)
  }

  AeguardaCambiosReserva(nombre_admi: string, id_empresa: number, id_reserva: number, nuevaReserva: Reserva){ 
    return this.http.put(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_reservas/${id_reserva}/editar/guardar`, nuevaReserva)
  }

  AeEliminaReserva(nombre_admi: string, id_empresa: number, id_reserva: number){ 
    return this.http.delete(`${this.API_URI}/reservas/admi_empresa/${nombre_admi}/${id_empresa}/lista_reservas/${id_reserva}/eliminar`)
  }

  getUsuario(nombre_usuario: string){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/editar`)
  }

  guardarCambiosUsuario(nombre_usuario: string, nuevoUsuario: Usuario){
    return this.http.put(`${this.API_URI}/reservas/usuario/${nombre_usuario}/editar/guardar`, nuevoUsuario)
  }

  eliminarCuentaUsuarioUsu(nombre_usuario: string){
    return this.http.delete(`${this.API_URI}/reservas/usuario/${nombre_usuario}/eliminar`)
  }

  getReservasDelUsuario(nombre_usuario: string){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/reservas`)
  }

  getReservasEmpresa(nombre_usuario: string, id_empresa: number){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/reservas/${id_empresa}`)
  }

  getReservaIdUsu(nombre_usuario: string, id_reserva: number){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/reservas/ver/${id_reserva}`)
  }

  guardaCambiosReservaUsu(nombre_usuario: string, id_reserva: number, nuevaReserva: Reserva){
    return this.http.put(`${this.API_URI}/reservas/usuario/${nombre_usuario}/reservas/ver/${id_reserva}/editar/guardar`, nuevaReserva)
  }

  eliminaReservaUsu(nombre_usuario: string, id_reserva: number){
    return this.http.delete(`${this.API_URI}/reservas/usuario/${nombre_usuario}/reservas/ver/${id_reserva}/eliminar`)
  }

  getRecursos(nombre_usuario: string, id_empresa: number){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/realiza_reserva/${id_empresa}`)
  }

  getDatosRecursoUsu(nombre_usuario: string, id_recursoservicio: number){
    return this.http.get(`${this.API_URI}/reservas/usuario/${nombre_usuario}/realiza_reserva/recurso/${id_recursoservicio}/get`)
  }

  crearReserva(nombre_usuario: string, id_recursoservicio: number, nuevaReserva: Reserva){
    return this.http.post(`${this.API_URI}/reservas/usuario/${nombre_usuario}/realiza_reserva/recurso/${id_recursoservicio}/reserva`, nuevaReserva)
  }



}
