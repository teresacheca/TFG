"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basedatos_1 = __importDefault(require("../basedatos"));
class ReservasController {
    getUsuarioLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ? and contrasena = ?', [req.params.nombre, req.params.contrasena]);
            //res.json({message: 'El usuario existe'})
            return res.json(usuario[0]);
        });
    }
    crearEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            basedatos_1.default.query('INSERT INTO solicitud (nombre_empresa, datos_de_contacto, descripcion, logo, direccion, estado) VALUES (?, ?, ?, ?, ?, ?)', [req.body.nombre_empresa, req.body.datos_de_contacto, req.body.descripcion, req.body.logo, req.body.direccion, 'Pendiente']);
            //res.json({message: 'El usuario existe'})
            res.json({ message: 'la empresa se ha creado' });
        });
    }
    getEmpresas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empresas = yield basedatos_1.default.promise().query('SELECT * FROM Empresas');
            const rows = empresas[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getSolicitudes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitudes = yield basedatos_1.default.promise().query('SELECT * FROM solicitud');
            const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getSolicitudesAceptadas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitudes = yield basedatos_1.default.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["aceptada"]);
            const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getSolicitudesRechazadas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitudes = yield basedatos_1.default.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["rechazada"]);
            const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getSolicitudesPendientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitudes = yield basedatos_1.default.promise().query('SELECT * FROM solicitud WHERE estado = ?', ["pendiente"]);
            const rows = solicitudes[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empresa = yield basedatos_1.default.promise().query('SELECT * FROM Empresas WHERE nombre_empresa = ?', [req.params.nombre_empresa]);
            const rows = empresa[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getEmpresaId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empresa = yield basedatos_1.default.promise().query('SELECT * FROM Empresas WHERE id_empresa = ?', [req.params.id_empresa]);
            const rows = empresa[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    eliminarEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Empresas WHERE id_empresa = ?', [req.params.id_empresa]);
            res.json({ message: 'la reserva fue eliminada' });
        });
    }
    guardarCambios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Empresas set ? WHERE id_empresa = ?', [req.body, req.params.id_empresa]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    getAdministradoresEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const administradores = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id_empresa = ? and tipo = 1', [req.params.id_empresa]);
            const rows = administradores[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getUsuariosEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id_empresa = ? and tipo = 2', [req.params.id_empresa]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getAdministradorEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    eliminarCuentaAdmiEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Usuarios WHERE id = ?', [req.params.id]);
            res.json({ message: 'el usuario fue eliminada' });
        });
    }
    guardarCambiosAdmiEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield basedatos_1.default.promise().query('UPDATE Usuarios set ? WHERE id = ?', [req.body, req.params.id]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    getSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitud = yield basedatos_1.default.promise().query('SELECT * FROM solicitud WHERE id_solicitud = ?', [req.params.id_solicitud]);
            const rows = solicitud[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    nuevaEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            basedatos_1.default.query('INSERT INTO Empresas (nombre_empresa, datos_de_contacto, descripcion, logo, direccion) VALUES (?, ?, ?, ?, ?)', [req.body.nombre_empresa, req.body.datos_de_contacto, req.body.descripcion, req.body.logo, req.body.direccion]);
            res.json({ message: 'la empresa se ha creado' });
        });
    }
    actualizarSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Solicitud set ? WHERE id_solicitud = ?', [req.body, req.params.id_solicitud]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    eliminarSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Solicitud WHERE id_solicitud = ?', [req.params.id_solicitud]);
            res.json({ message: 'el usuario fue eliminada' });
        });
    }
    getUsuarioNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield basedatos_1.default.promise().query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
            const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getDatosAdministradorEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    guardarCambiosUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Usuarios set ? WHERE nombre_usuario = ?', [req.body, req.params.nombre_usuario]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    eliminarCuentaAdmiEmpresaAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Usuarios WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
            res.json({ message: 'la reserva fue eliminada' });
        });
    }
    getUsuariosEmpresaAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id_empresa = ? and tipo = 2', [req.params.id_empresa]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getUsuarioId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    guardarCambiosUsuarioAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Usuarios set ? WHERE id = ?', [req.body, req.params.id]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    eliminarCuentaUsuarioAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
            yield basedatos_1.default.promise().query('DELETE FROM Usuarios WHERE id= ?', [req.params.id]);
            res.json(usuario[0]);
        });
    }
    AeaniadeUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            basedatos_1.default.query('INSERT INTO Usuarios (nombre_usuario, contrasena, fecha_nacimiento, puesto_trabajo, empresa, tipo, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.body.nombre_usuario, req.body.contrasena, req.body.fecha_nacimiento, req.body.puesto_trabajo, req.body.empresa, 2, req.body.id_empresa]);
            res.json({ message: 'el usuario se ha creado' });
        });
    }
    getRecursos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recursos = yield basedatos_1.default.promise().query('SELECT * FROM RecursoServicio WHERE id_empresa = ?', [req.params.id_empresa]);
            const rows = recursos[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getDatosRecurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const recurso = yield basedatos_1.default.promise().query('SELECT * FROM RecursoServicio WHERE id_recursoservicio = ?', [req.params.id_recursoservicio]);
            const rows = recurso[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    guardarCambiosRecursoAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE RecursoServicio set ? WHERE id_recursoservicio = ?', [req.body, req.params.id_recursoservicio]);
            res.json({ message: 'El recurso fue actualizada' });
        });
    }
    eliminarRescursoAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM RecursoServicio WHERE id_recursoservicio= ?', [req.params.id_recursoservicio]);
            yield basedatos_1.default.promise().query('DELETE FROM Reservas WHERE id_recursoservicio= ?', [req.params.id_recursoservicio]);
            res.json({ message: 'El recurso fue eliminada' });
        });
    }
    AeaniadeRecurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            basedatos_1.default.query('INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.body.nombre_rs, req.body.descripcion, req.body.foto, req.body.datos, req.body.aforo, req.body.nombre_empresa, req.body.id_empresa]);
            res.json({ message: 'el recurso o servicio se ha creado' });
        });
    }
    getReservasAe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = yield basedatos_1.default.promise().query('SELECT * FROM reservas WHERE id_empresa = ?', [req.params.id_empresa]);
            const rows = reservas[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getReservaId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Reservas WHERE id_reserva = ?', [req.params.id_reserva]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    guardaCambiosReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Reservas set ? WHERE id_reserva = ?', [req.body, req.params.id_reserva]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    eliminaReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Reservas WHERE id_reserva= ?', [req.params.id_reserva]);
            res.json({ message: 'La reserva fue eliminada' });
        });
    }
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
            const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    guardarCambiosUsuarioUsu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE Usuarios set ? WHERE nombre_usuario = ?', [req.body, req.params.nombre_usuario]);
            res.json({ message: 'El usuario fue actualizada' });
        });
    }
    eliminarCuentaUsuarioUsu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Usuarios WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
            yield basedatos_1.default.promise().query('DELETE FROM Reservas WHERE nombre_usuario= ?', [req.params.nombre_usuario]);
            res.json({ message: 'el usuario fue eliminada' });
        });
    }
    getReservasDelUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.nombre_usuario);
            const usuario = yield basedatos_1.default.promise().query('SELECT * FROM Reservas WHERE nombre_usuario = ?', [req.params.nombre_usuario]);
            const rows = usuario[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getReservasEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = yield basedatos_1.default.promise().query('SELECT * FROM Reservas WHERE id_empresa = ?', [req.params.id_empresa]);
            const rows = reservas[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    crearReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let fecha = new Date(req.body.fecha);
            basedatos_1.default.query('INSERT INTO Reservas (nombre_rs, nombre_usuario, nombre_empresa, fecha, hora, id_recursoservicio, id_empresa) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.body.nombre_rs, req.params.nombre_usuario, req.body.nombre_empresa, fecha, req.body.hora, req.params.id_recursoservicio, req.body.id_empresa]);
            res.json({ message: 'la reserva se ha creado' });
        });
    }
}
const reservasController = new ReservasController();
exports.default = reservasController;
