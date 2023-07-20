import {Request, Response } from 'express';
import pool from '../basedatos'

class ReservasController{
    
    public async getUsuarioLogin(req: Request, res: Response){
        const usuario = await pool.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ? and contrasena = ?', [req.params.nombre, req.params.contrasena]);
        //res.json({message: 'El usuario existe'})
        return res.json(usuario[0])

    }

    public async crearEmpresa(req: Request, res: Response){
        pool.query('INSERT INTO solicitud (nombre_empresa, datos_de_contacto, descripcion, logo, direccion, estado) VALUES (?, ?, ?, ?, ?, ?)', [req.body.nombre_empresa, req.body.datos_de_contacto, req.body.descripcion, req.body.logo, req.body.direccion,'pendiente'])
        //res.json({message: 'El usuario existe'})
        res.json({message: 'la empresa se ha creado'});
    }

    public async getEmpresas(req: Request, res: Response) { //listar todas las reservas
        const empresas = await pool.promise().query('SELECT * FROM Empresas');
        const rows = empresas[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    } 

    public async getSolicitudes(req: Request, res: Response) { //listar todas las reservas
        const solicitudes = await pool.promise().query('SELECT * FROM solicitud');
        const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    } 

    public async getSolicitudesAceptadas(req: Request, res: Response) { //listar todas las reservas
        const solicitudes = await pool.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["aceptada"]);
        const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async getSolicitudesRechazadas(req: Request, res: Response) { //listar todas las reservas
        const solicitudes = await pool.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["rechazada"]);
        const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async getSolicitudesPendientes(req: Request, res: Response) { //listar todas las reservas
        const solicitudes = await pool.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["pendiente"]);
        const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async getEmpresa(req: Request, res: Response) { //listar todas las reservas
        const empresa = await pool.promise().query('SELECT * FROM Empresas WHERE nombre_empresa = ?', [req.params.nombre_empresa]);
        const rows = empresa[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    } 

    public async eliminarEmpresa(req: Request, res: Response){
        const aux = await pool.promise().query('DELETE FROM Empresas WHERE nombre_empresa = ?', [req.params.nombre_empresa]);
        res.json({message: 'la reserva fue eliminada'}) 
    }

    public async guardarCambios(req: Request, res: Response){
        await pool.promise().query('UPDATE Empresas set ? WHERE nombre_empresa = ?', [req.body, req.params.nombre_empresa]);
        res.json({message: 'La reserva fue actualizada'})
    }

    public async getAdministradoresEmpresa(req: Request, res: Response) { //listar todas las reservas
        const administradores = await pool.promise().query('SELECT * FROM Usuarios WHERE empresa = ? and tipo = 1', [req.params.nombre_empresa]);
        const rows = administradores[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    } 

    public async getUsuariosEmpresa(req: Request, res: Response) { //listar todas las reservas
        const usuarios = await pool.promise().query('SELECT * FROM Usuarios WHERE empresa = ? and tipo = 2', [req.params.nombre_empresa]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async getAdministradorEmpresa(req: Request, res: Response) { //listar todas las reservas
        const usuarios = await pool.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async eliminarCuentaAdmiEmpresa(req: Request, res: Response) { //listar todas las reservas
        const aux = await pool.promise().query('DELETE FROM Usuarios WHERE id = ?', [req.params.id]);
        res.json({message: 'el usuario fue eliminada'})
    }

    public async guardarCambiosAdmiEmpresa(req: Request, res: Response) { //listar todas las reservas
        await pool.promise().query('UPDATE Usuarios set ? WHERE nombre_usuario', [req.body, req.params.nombre_usuario]);
        res.json({message: 'La reserva fue actualizada'})
    }
    public async getSolicitud(req: Request, res: Response) { 
        const solicitud = await pool.promise().query('SELECT * FROM solicitud WHERE id_solicitud = ?', [req.params.id_solicitud]);
        const rows = solicitud[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async nuevaEmpresa(req: Request, res: Response) { 
        pool.query('INSERT INTO Empresas (nombre_empresa, datos_de_contacto, descripcion, logo, direccion) VALUES (?, ?, ?, ?, ?)', [req.body.nombre_empresa, req.body.datos_de_contacto, req.body.descripcion, req.body.logo, req.body.direccion]);
        res.json({message: 'la empresa se ha creado'});
    }

    public async actualizarSolicitud(req: Request, res: Response) { //listar todas las reservas
        await pool.promise().query('UPDATE Solicitud set ? WHERE id_solicitud = ?', [req.body, req.params.id_solicitud]);
        res.json({message: 'La reserva fue actualizada'})
    }

    public async eliminarSolicitud(req: Request, res: Response) { //listar todas las reservas
        const aux = await pool.promise().query('DELETE FROM Solicitud WHERE id_solicitud = ?', [req.params.id_solicitud]);
        res.json({message: 'el usuario fue eliminada'})
    }

    public async getUsuarioNombre(req: Request, res: Response) { //listar todas las reservas
        const usuario = await pool.promise().query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
        const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async getDatosAdministradorEmpresa(req: Request, res: Response) { //listar todas las reservas
        const usuarios = await pool.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async guardarCambiosUsuario(req: Request, res: Response) { //listar todas las reservas
        await pool.promise().query('UPDATE Usuarios set ? WHERE nombre_usuario = ?', [req.body, req.params.nombre_usuario]);
        res.json({message: 'La reserva fue actualizada'})
    }

    public async eliminarCuentaAdmiEmpresaAe(req: Request, res: Response){
        const aux = await pool.promise().query('DELETE FROM Usuarios WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
        res.json({message: 'la reserva fue eliminada'}) 
    }

    public async getUsuariosEmpresaAe(req: Request, res: Response) { //listar todas las reservas
        const usuarios = await pool.promise().query('SELECT * FROM Usuarios WHERE empresa = ? and tipo = 2', [req.params.nombre_empresa]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async getUsuarioId(req: Request, res: Response) { //listar todas las reservas
        const usuarios = await pool.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async guardarCambiosUsuarioAe(req: Request, res: Response) { //listar todas las reservas
        await pool.promise().query('UPDATE Usuarios set ? WHERE id = ?', [req.body, req.params.id]);
        res.json({message: 'La reserva fue actualizada'})
    }

    public async eliminarCuentaUsuarioAe(req: Request, res: Response){
        const usuario = await pool.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
        await pool.promise().query('DELETE FROM Usuarios WHERE id= ?', [req.params.id]);
        res.json(usuario[0]);
    }

    public async AeaniadeUsuario(req: Request, res: Response) { 
        pool.query('INSERT INTO Usuarios (nombre_usuario, contrasena, fecha_nacimiento, puesto_trabajo, empresa, tipo) VALUES (?, ?, ?, ?, ?, ?)', [req.body.nombre_usuario, req.body.contrasena, req.body.fecha_nacimiento, req.body.puesto_trabajo, req.body.empresa, 2]);
        res.json({message: 'el usuario se ha creado'});
    }

    public async getRecursos(req: Request, res: Response) { //listar todas las reservas
        const recursos = await pool.promise().query('SELECT * FROM RecursoServicio WHERE nombre_empresa = ?', [req.params.nombre_empresa]);
        const rows = recursos[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async getDatosRecurso(req: Request, res: Response) { //listar todas las reservas
        const recurso = await pool.promise().query('SELECT * FROM RecursoServicio WHERE id_recursoservicio = ?', [req.params.id_recursoservicio]);
        const rows = recurso[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async guardarCambiosRecursoAe(req: Request, res: Response) { //listar todas las reservas
        await pool.promise().query('UPDATE RecursoServicio set ? WHERE id_recursoservicio = ?', [req.body, req.params.id_recursoservicio]);
        res.json({message: 'El recurso fue actualizada'})
    }

    public async eliminarRescursoAe(req: Request, res: Response){
        const aux = await pool.promise().query('DELETE FROM RecursoServicio WHERE id_recursoservicio= ?', [req.params.id_recursoservicio]);
        res.json({message: 'El recurso fue eliminada'}) 
    }

    public async AeaniadeRecurso(req: Request, res: Response) { 
        pool.query('INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa) VALUES (?, ?, ?, ?, ?, ?)', [req.body.nombre_rs, req.body.descripcion, req.body.foto, req.body.datos, req.body.aforo, req.body.nombre_empresa]);
        res.json({message: 'el recurso o servicio se ha creado'});
    }

    public async getReservasAe(req: Request, res: Response) { 
        const reservas = await pool.promise().query('SELECT * FROM reservas WHERE nombre_empresa = ?', [req.params.nombre_empresa]);
        const rows = reservas[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async getReservaId(req: Request, res: Response) { //listar todas las reservas
        const usuarios = await pool.promise().query('SELECT * FROM Reservas WHERE id_reserva = ?', [req.params.id_reserva]);
        const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async guardaCambiosReserva(req: Request, res: Response) { //listar todas las reservas
        await pool.promise().query('UPDATE Reservas set ? WHERE id_reserva = ?', [req.body, req.params.id_reserva]);
        res.json({message: 'La reserva fue actualizada'})
    }

    public async eliminaReserva(req: Request, res: Response){
        const aux = await pool.promise().query('DELETE FROM Reservas WHERE id_reserva= ?', [req.params.id_reserva]);
        res.json({message: 'La reserva fue eliminada'}) 
    }

    public async getUsuario(req: Request, res: Response) { //listar todas las reservas
        const usuario = await pool.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
        const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async guardarCambiosUsuarioUsu(req: Request, res: Response) { //listar todas las reservas
        await pool.promise().query('UPDATE Usuarios set ? WHERE nombre_usuario = ?', [req.body, req.params.nombre_usuario]);
        res.json({message: 'El usuario fue actualizada'})
    }

    public async eliminarCuentaUsuarioUsu(req: Request, res: Response){
        const aux = await pool.promise().query('DELETE FROM Usuarios WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
        await pool.promise().query('DELETE FROM Reservas WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
        res.json({message: 'el usuario fue eliminada'}) 
    }

    public async getReservasDelUsuario(req: Request, res: Response) { //listar todas las reservas
        console.log(req.params.nombre_usuario)
        const usuario = await pool.promise().query('SELECT * FROM Reservas WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
        const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async getReservasEmpresa(req: Request, res: Response) { //listar todas las reservas
        const reservas = await pool.promise().query('SELECT * FROM Reservas WHERE nombre_empresa = ?', [req.params.nombre_empresa]);
        const rows = reservas[0]; // Accede a los resultados utilizando la posición 0
        res.json(rows);
    }

    public async crearReserva(req: Request, res: Response) { 
        let fecha = new Date(req.body.fecha)
        pool.query('INSERT INTO Reservas (nombre_rs, nombre_usuario, nombre_empresa, fecha, hora) VALUES (?, ?, ?, ?, ?)', [req.body.nombre_rs, req.body.nombre_usuario, req.body.nombre_empresa, fecha, req.body.hora]);
        res.json({message: 'la reserva se ha creado'});
    }
}

const reservasController = new ReservasController();
export default reservasController;