import {Router} from 'express';
import reservasController from '../controllers/reservasController'

class ReservasRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', reservasController.list); //listar todas las reservas
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
        this.router.get('/lista_solicitudes/:id_solicitud', reservasController.getSolicitud); 
        this.router.delete('/lista_solicitudes/:id_solicitud/eliminar', reservasController.eliminarSolicitud); 
        this.router.post('/lista_solicitudes/:id_solicitud/:nombre_empresa', reservasController.nuevaEmpresa); 
        this.router.get('/lista_solicitudes', reservasController.getSolicitudes); 
        this.router.get('/:fecha', reservasController.getOne); //mostrar una reserva
        this.router.get('/:nombre/:contrasena', reservasController.getUsuario); //mostrar una reserva
        this.router.post('/', reservasController.create); //crear una reserva
        this.router.put('/:fecha', reservasController.update); //actualizar un dato
        this.router.delete('/:fecha', reservasController.delete); //eliminar un dato
        this.router.post('/empresas/:nombre_empresa', reservasController.crearEmpresa); 
        
    }
}

const reservasRoutes = new ReservasRoutes();
export default reservasRoutes.router;