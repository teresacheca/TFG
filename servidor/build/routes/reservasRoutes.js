"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservasController_1 = __importDefault(require("../controllers/reservasController"));
class ReservasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', reservasController_1.default.list); //listar todas las reservas
        this.router.get('/empresas', reservasController_1.default.getEmpresas);
        this.router.get('/empresas/:nombre_empresa', reservasController_1.default.getEmpresa);
        this.router.delete('/empresas/eliminar/:nombre_empresa', reservasController_1.default.eliminarEmpresa);
        this.router.get('/empresas/:nombre_empresa/lista_administradores', reservasController_1.default.getAdministradoresEmpresa);
        this.router.get('/empresas/:nombre_empresa/lista_administradores/:id', reservasController_1.default.getAdministradorEmpresa);
        this.router.delete('/empresas/:nombre_empresa/lista_administradores/:id/eliminar', reservasController_1.default.eliminarCuentaAdmiEmpresa);
        this.router.put('/empresas/:nombre_empresa/lista_administradores/:id', reservasController_1.default.guardarCambiosAdmiEmpresa);
        this.router.get('/empresas/:nombre_empresa/lista_usuarios', reservasController_1.default.getUsuariosEmpresa);
        this.router.get('/empresas/:nombre_empresa/lista_usuarios/:nombre_usuario', reservasController_1.default.getUsuarioNombre);
        this.router.put('/empresas/cambiar/:nombre_empresa', reservasController_1.default.guardarCambios);
        this.router.get('/lista_solicitudes', reservasController_1.default.getSolicitudes);
        this.router.get('/lista_solicitudes/:id_solicitud', reservasController_1.default.getSolicitud);
        this.router.delete('/lista_solicitudes/:id_solicitud/eliminar', reservasController_1.default.eliminarSolicitud);
        this.router.post('/lista_solicitudes/:id_solicitud/:nombre_empresa', reservasController_1.default.nuevaEmpresa);
        this.router.get('/lista_solicitudes', reservasController_1.default.getSolicitudes);
        this.router.get('/:fecha', reservasController_1.default.getOne); //mostrar una reserva
        this.router.get('/:nombre/:contrasena', reservasController_1.default.getUsuario); //mostrar una reserva
        this.router.post('/', reservasController_1.default.create); //crear una reserva
        this.router.put('/:fecha', reservasController_1.default.update); //actualizar un dato
        this.router.delete('/:fecha', reservasController_1.default.delete); //eliminar un dato
        this.router.post('/empresas/:nombre_empresa', reservasController_1.default.crearEmpresa);
    }
}
const reservasRoutes = new ReservasRoutes();
exports.default = reservasRoutes.router;
