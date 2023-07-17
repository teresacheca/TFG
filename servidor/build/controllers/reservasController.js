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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = yield basedatos_1.default.promise().query('SELECT * FROM reservas');
            const rows = reservas[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = yield basedatos_1.default.promise().query('SELECT * FROM reservas WHERE fecha = ?', [req.params.fecha]);
            const rows = reservas[0];
            return res.json(rows);
            //res.status(404).json({text: 'la reserva no existe'});
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            basedatos_1.default.query('INSERT INTO reservas set ?', [req.body]);
            res.json({ message: 'la reserva se ha creado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = yield basedatos_1.default.promise().query('SELECT * FROM reservas WHERE fecha = ?', [req.params.fecha]);
            const rows = reservas[0];
            yield basedatos_1.default.promise().query('DELETE FROM reservas WHERE fecha = ?', [req.params.fecha]);
            res.json({ message: 'la reserva fue eliminada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield basedatos_1.default.promise().query('UPDATE reservas set ? WHERE fecha = ?', [req.body, req.params.fecha]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    getUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE nombre_usuario = ? and contrasena = ?', [req.params.nombre, req.params.contrasena]);
            //res.json({message: 'El usuario existe'})
            return res.json(usuario[0]);
        });
    }
    crearEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            basedatos_1.default.query('INSERT INTO solicitud (nombre_empresa, datos_de_contacto, descripcion, logo, direccion, estado) VALUES (?, ?, ?, ?, ?, ?)', [req.body.nombre_empresa, req.body.datos_de_contacto, req.body.descripcion, req.body.logo, req.body.direccion, 'pendiente']);
            //res.json({message: 'El usuario existe'})
            res.json({ message: 'la empresa se ha creado' });
        });
    }
    getEmpresas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('aaa');
            const empresas = yield basedatos_1.default.promise().query('SELECT * FROM Empresas');
            const rows = empresas[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getSolicitudes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("iii");
            const solicitudes = yield basedatos_1.default.promise().query('SELECT * FROM solicitud');
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
    eliminarEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Empresas WHERE nombre_empresa = ?', [req.params.nombre_empresa]);
            console.log("aux" + aux);
            res.json({ message: 'la reserva fue eliminada' });
        });
    }
    guardarCambios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("2");
            yield basedatos_1.default.promise().query('UPDATE Empresas set ? WHERE nombre_empresa = ?', [req.body, req.params.nombre_empresa]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    getAdministradoresEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const administradores = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE empresa = ? and tipo = 1', [req.params.nombre_empresa]);
            console.log(req.params.nombre_empresa);
            const rows = administradores[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getUsuariosEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE empresa = ? and tipo = 2', [req.params.nombre_empresa]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    getAdministradorEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("!!!");
            console.log(req.params.id);
            const usuarios = yield basedatos_1.default.promise().query('SELECT * FROM Usuarios WHERE id = ?', [req.params.id]);
            const rows = usuarios[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    eliminarCuentaAdmiEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Usuarios WHERE id = ?', [req.params.id]);
            console.log("aux" + aux);
            res.json({ message: 'el usuario fue eliminada' });
        });
    }
    guardarCambiosAdmiEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("2");
            yield basedatos_1.default.promise().query('UPDATE Usuarios set ? WHERE id = ?', [req.body, req.params.id]);
            res.json({ message: 'La reserva fue actualizada' });
        });
    }
    getSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("1");
            const solicitud = yield basedatos_1.default.promise().query('SELECT * FROM solicitud WHERE id_solicitud = ?', [req.params.id_solicitud]);
            const rows = solicitud[0]; // Accede a los resultados utilizando la posición 0
            res.json(rows);
        });
    }
    nuevaEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            //pool.query('INSERT INTO Empresas VALUES (?, ?, ?, ?, ?)', [req.body.nombre_empresa, req.body.datos_de_contacto, req.body.descripcion, req.body.logo, req.body.direccion]);
            console.log("21");
            basedatos_1.default.query('INSERT INTO Empresas (nombre_empresa, datos_de_contacto, descripcion, logo, direccion) VALUES (?, ?, ?, ?, ?)', [req.body.nombre_empresa, req.body.datos_de_contacto, req.body.descripcion, req.body.logo, req.body.direccion]);
            console.log("hh");
            res.json({ message: 'la empresa se ha creado' });
        });
    }
    eliminarSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("22");
            const aux = yield basedatos_1.default.promise().query('DELETE FROM Solicitud WHERE id_solicitud = ?', [req.params.id_solicitud]);
            res.json({ message: 'el usuario fue eliminada' });
        });
    }
}
const reservasController = new ReservasController();
exports.default = reservasController;
