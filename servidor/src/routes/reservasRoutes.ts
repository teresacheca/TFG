import {Router} from 'express';
import reservasController from '../controllers/reservasController'

class ReservasRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        
        this.router.get('/admi_empresa/:nombre_usuario/get', reservasController.getUsuarioNombre); 
        this.router.get('/admi_empresa/:nombre_usuario/editar', reservasController.getDatosAdministradorEmpresa); 
        this.router.put('/admi_empresa/:nombre_usuario/editar/guardar', reservasController.guardarCambiosUsuario);
        this.router.delete('/admi_empresa/:nombre_usuario/editar/eliminar', reservasController.eliminarCuentaAdmiEmpresaAe);

        this.router.get('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_usuarios', reservasController.getUsuariosEmpresaAe);
        this.router.get('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_usuarios/:id', reservasController.getUsuarioId);
        this.router.put('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_usuarios/:id/editar', reservasController.guardarCambiosUsuarioAe);
        this.router.delete('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_usuarios/:id/eliminar', reservasController.eliminarCuentaUsuarioAe);
        this.router.delete('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_usuarios/:id_reserva/eliminar_reserva', reservasController.eliminaReserva);
        this.router.post('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_usuarios/aniade/guardar', reservasController.AeaniadeUsuario);

        this.router.get('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_recursos/get', reservasController.getRecursos);
        this.router.get('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_recursos/:id_recursoservicio', reservasController.getDatosRecurso);
        this.router.put('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_recursos/:id_recursoservicio/editar', reservasController.guardarCambiosRecursoAe);
        this.router.delete('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_recursos/:id_recursoservicio/eliminar', reservasController.eliminarRescursoAe);
        this.router.post('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_recursos/aniade/guardar', reservasController.AeaniadeRecurso);

        this.router.get('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_reservas/get', reservasController.getReservasAe);
        this.router.get('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_reservas/:id_reserva', reservasController.getReservaId);
        this.router.put('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_reservas/:id_reserva/editar/guardar', reservasController.guardaCambiosReserva);
        this.router.delete('/admi_empresa/:nombre_usuario/:nombre_empresa/lista_reservas/:id_reserva/editar/guardar', reservasController.eliminaReserva);

        this.router.get('/usuario/:nombre_usuario/editar', reservasController.getUsuario); 
        this.router.put('/usuario/:nombre_usuario/editar/guardar', reservasController.guardarCambiosUsuarioUsu);
        this.router.delete('/usuario/:nombre_usuario/eliminar', reservasController.eliminarCuentaUsuarioUsu);
        this.router.get('/usuario/:nombre_usuario/reservas', reservasController.getReservasDelUsuario);
        this.router.get('/usuario/:nombre_usuario/reservas/:nombre_empresa', reservasController.getReservasEmpresa);
        this.router.get('/usuario/:nombre_usuario/reservas/ver/:id_reserva', reservasController.getReservaId);
        this.router.put('/usuario/:nombre_usuario/reservas/ver/:id_reserva/editar/guardar', reservasController.guardaCambiosReserva);
        this.router.delete('/usuario/:nombre_usuario/reservas/ver/:id_reserva/eliminar', reservasController.eliminaReserva);

        this.router.get('/usuario/:nombre_usuario/realiza_reserva/:nombre_empresa', reservasController.getRecursos);
        this.router.get('/usuario/:nombre_usuario/realiza_reserva/recurso/:id_recursoservicio/get', reservasController.getDatosRecurso);
        this.router.post('/usuario/:nombre_usuario/realiza_reserva/recurso/:id_recursoservicio/reserva', reservasController.crearReserva);

        this.router.get('/empresas', reservasController.getEmpresas); 
        this.router.get('/empresas/:nombre_empresa', reservasController.getEmpresa); 
        this.router.delete('/empresas/eliminar/:nombre_empresa', reservasController.eliminarEmpresa);
        this.router.get('/empresas/:nombre_empresa/lista_administradores', reservasController.getAdministradoresEmpresa); 
        this.router.get('/empresas/:nombre_empresa/lista_administradores/:id', reservasController.getAdministradorEmpresa);
        this.router.delete('/empresas/:nombre_empresa/lista_administradores/:id/eliminar', reservasController.eliminarCuentaAdmiEmpresa); 
        this.router.put('/empresas/:nombre_empresa/lista_administradores/:id', reservasController.guardarCambiosAdmiEmpresa); 
        this.router.get('/empresas/:nombre_empresa/lista_usuarios', reservasController.getUsuariosEmpresa); 
        this.router.get('/empresas/:nombre_empresa/lista_usuarios/:nombre_usuario', reservasController.getUsuarioNombre); 
        this.router.put('/empresas/cambiar/:nombre_empresa', reservasController.guardarCambios);

        this.router.get('/lista_solicitudes', reservasController.getSolicitudes); 
        this.router.get('/lista_solicitudes/aceptadas', reservasController.getSolicitudesAceptadas); 
        this.router.get('/lista_solicitudes/rechazadas', reservasController.getSolicitudesRechazadas); 
        this.router.get('/lista_solicitudes/pendientes', reservasController.getSolicitudesPendientes); 
        this.router.get('/lista_solicitudes/:id_solicitud', reservasController.getSolicitud); 
        this.router.put('/lista_solicitudes/:id_solicitud/actualizar', reservasController.actualizarSolicitud);
        this.router.delete('/lista_solicitudes/:id_solicitud/eliminar', reservasController.eliminarSolicitud); 
        this.router.post('/lista_solicitudes/:id_solicitud/:nombre_empresa', reservasController.nuevaEmpresa); 
        this.router.get('/lista_solicitudes', reservasController.getSolicitudes); 


        this.router.get('/:nombre/:contrasena', reservasController.getUsuarioLogin); //mostrar una reserva
        this.router.post('/empresas/:nombre_empresa', reservasController.crearEmpresa); 
        
    }
}

const reservasRoutes = new ReservasRoutes();
export default reservasRoutes.router;