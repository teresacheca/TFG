CREATE DATABASE base_datos_reservas;

USE base_datos_reservas;

DROP TABLE IF EXISTS solicitud;
DROP TABLE IF EXISTS consulta_usuario;
DROP TABLE IF EXISTS hace;
DROP TABLE IF EXISTS pertenece;
DROP TABLE IF EXISTS consulta_admi;
DROP TABLE IF EXISTS perteneceA;
DROP TABLE IF EXISTS tiene;
DROP TABLE IF EXISTS crea;
DROP TABLE IF EXISTS alta;
DROP TABLE IF EXISTS añade;
DROP TABLE IF EXISTS crea_instancia;
DROP TABLE IF EXISTS Reservas;
DROP TABLE IF EXISTS RecursoServicio;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Administradores_empresa;
DROP TABLE IF EXISTS Empresas;
DROP TABLE IF EXISTS Administrador_general;

CREATE TABLE Administrador_general (
    nombre_admi_general VARCHAR(100) NOT NULL PRIMARY KEY,
    contrasena VARCHAR(100) NOT NULL
);

CREATE TABLE Empresas (
    nombre_empresa VARCHAR(100) NOT NULL UNIQUE,
    datos_de_contacto VARCHAR(100),
    descripcion VARCHAR(100), 
    logo VARCHAR(100), 
    direccion VARCHAR(100),
    id_empresa INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE Administradores_empresa (
    nombre_admi_empresa VARCHAR(100) NOT NULL PRIMARY KEY,
    contrasena VARCHAR(100),
    empresa VARCHAR(100)
);

CREATE TABLE Usuarios (
    nombre_usuario VARCHAR(100) NOT NULL PRIMARY KEY,
    contrasena VARCHAR(100),
    fecha_nacimiento DATE,
    puesto_trabajo VARCHAR(100),
    empresa VARCHAR(100), 
    tipo INT(10),
    id INT(10) AUTO_INCREMENT UNIQUE
);

CREATE TABLE RecursoServicio (
    nombre_rs VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100),
    foto VARCHAR(100),
    datos VARCHAR(100),
    aforo INT(10),
    nombre_empresa VARCHAR(100),
    id_recursoservicio INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE Reservas (
    fecha DATE, 
    hora TIME,
    PRIMARY KEY (fecha, hora)
);

CREATE TABLE crea_instancia (
    nombre_empresa VARCHAR(100),
    nombre_admi_general VARCHAR(100),
    FOREIGN KEY (nombre_empresa) REFERENCES Empresas(nombre_empresa),
    FOREIGN KEY (nombre_admi_general) REFERENCES Administrador_general(nombre_admi_general),
    PRIMARY KEY (nombre_empresa, nombre_admi_general)
);

CREATE TABLE añade (
    nombre_admi_empresa VARCHAR(100),
    nombre_admi_general VARCHAR(100),
    FOREIGN KEY (nombre_admi_empresa) REFERENCES Administradores_empresa(nombre_admi_empresa),
    FOREIGN KEY (nombre_admi_general) REFERENCES Administrador_general(nombre_admi_general),
    PRIMARY KEY (nombre_admi_empresa, nombre_admi_general)
);

CREATE TABLE alta (
    nombre_usuario VARCHAR(100),
    nombre_admi_empresa VARCHAR(100),
    FOREIGN KEY (nombre_usuario) REFERENCES Usuarios(nombre_usuario),
    FOREIGN KEY (nombre_admi_empresa) REFERENCES Administradores_empresa(nombre_admi_empresa),
    PRIMARY KEY (nombre_usuario, nombre_admi_empresa)
);

CREATE TABLE crea (
    nombre_rs VARCHAR(100),
    nombre_admi_empresa VARCHAR(100),
    FOREIGN KEY (nombre_rs) REFERENCES RecursoServicio(nombre_rs),
    FOREIGN KEY (nombre_admi_empresa) REFERENCES Administradores_empresa(nombre_admi_empresa),
    PRIMARY KEY (nombre_rs, nombre_admi_empresa)
);

CREATE TABLE tiene (
    nombre_rs VARCHAR(100),
    fecha DATE,
    hora TIME,
    FOREIGN KEY (nombre_rs) REFERENCES RecursoServicio(nombre_rs),
    FOREIGN KEY (fecha, hora) REFERENCES Reservas(fecha, hora),
    PRIMARY KEY (nombre_rs, fecha, hora)
);

CREATE TABLE perteneceA (
    nombre_admi_empresa VARCHAR(100),
    nombre_empresa VARCHAR(100),
    FOREIGN KEY (nombre_admi_empresa) REFERENCES Administradores_empresa(nombre_admi_empresa),
    FOREIGN KEY (nombre_empresa) REFERENCES Empresas(nombre_empresa),
    PRIMARY KEY (nombre_admi_empresa, nombre_empresa)
);

CREATE TABLE consulta_admi (
    nombre_admi_empresa VARCHAR(100),
    nombre_rs VARCHAR(100),
    fecha DATE,
    hora TIME,
    FOREIGN KEY (nombre_admi_empresa) REFERENCES Administradores_empresa(nombre_admi_empresa),
    FOREIGN KEY (nombre_rs) REFERENCES RecursoServicio(nombre_rs),
    FOREIGN KEY (fecha, hora) REFERENCES Reservas(fecha, hora),
    PRIMARY KEY (nombre_admi_empresa, nombre_rs, fecha, hora)
);

CREATE TABLE pertenece (
    nombre_usuario VARCHAR(100),
    nombre_empresa VARCHAR(100),
    FOREIGN KEY (nombre_usuario) REFERENCES Usuarios(nombre_usuario),
    FOREIGN KEY (nombre_empresa) REFERENCES Empresas(nombre_empresa),
    PRIMARY KEY (nombre_usuario, nombre_empresa)
);

CREATE TABLE hace (
    nombre_usuario VARCHAR(100),
    fecha DATE,
    hora TIME,
    FOREIGN KEY (nombre_usuario) REFERENCES Usuarios(nombre_usuario),
    FOREIGN KEY (fecha, hora) REFERENCES Reservas(fecha, hora),
    PRIMARY KEY (nombre_usuario, fecha, hora)
);

CREATE TABLE consulta_usuario (
    nombre_usuario VARCHAR(100),
    fecha DATE,
    hora TIME,
    nombre_rs VARCHAR(100),
    FOREIGN KEY (nombre_usuario) REFERENCES Usuarios(nombre_usuario),
    FOREIGN KEY (fecha, hora) REFERENCES Reservas(fecha, hora),
    FOREIGN KEY (nombre_rs) REFERENCES RecursoServicio(nombre_rs),
    PRIMARY KEY (nombre_usuario, nombre_rs, fecha, hora)
);

CREATE TABLE solicitud (
    nombre_empresa VARCHAR(100),
    datos_de_contacto VARCHAR(100),
    descripcion VARCHAR(100), 
    logo VARCHAR(100),
    nombre_admi_general VARCHAR(100),
    id_empresa VARCHAR(100),
    direccion VARCHAR(100),
    estado VARCHAR(100),
    id_solicitud INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);


INSERT INTO Empresas (nombre_empresa, datos_de_contacto, descripcion, logo, direccion)
VALUES ('EmpresaA', 'contacto@empresa-a.com', 'Descripción de la Empresa A', 'logo-empresa-a.png', 'Calle Principal 123'),
       ('EmpresaB', 'contacto@empresa-b.com', 'Descripción de la Empresa B', 'logo-empresa-b.png', 'Avenida Principal 456'),
       ('EmpresaC', 'contacto@empresa-c.com', 'Descripción de la Empresa C', 'logo-empresa-c.png', 'Carrera Principal 789');



INSERT INTO Usuarios (nombre_usuario, contrasena, fecha_nacimiento, puesto_trabajo, empresa, tipo)
VALUES ('Juan', 'password123', '1990-05-15', 'Desarrollador', 'EmpresaA', 1),
       ('María', 'secret456', '1985-08-20', 'Gerente de Ventas', 'EmpresaB', 2),
       ('Pedro', 'qwerty789', '1995-02-10', 'Analista de Datos', 'EmpresaC', 1),
       ('Luisa', 'abcd1234', '1992-11-30', 'Ejecutiva de Cuentas', 'EmpresaA', 0),
       ('Ana', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'EmpresaC', 2),
       ('Carlos', 'secure789', '1994-03-12', 'Desarrollador Full Stack', 'EmpresaB', 1);


INSERT INTO solicitud (nombre_empresa, datos_de_contacto, descripcion, logo, nombre_admi_general, id_empresa, direccion, estado)
VALUES ('EmpresaX', 'contacto@empresa-x.com', 'Descripción de la Empresa X', 'logo-empresa-x.png',  'Administrador X', 0, ' ', 'Pendiente'),
       ('EmpresaY', 'contacto@empresa-y.com', 'Descripción de la Empresa Y', 'logo-empresa-y.png', 'Administrador Y', 0, ' ',  'Aprobado'),
       ('EmpresaZ', 'contacto@empresa-z.com', 'Descripción de la Empresa Z', 'logo-empresa-z.png', 'Administrador Z', 0, ' ', 'Rechazado');


INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa)
VALUES ('Recurso 1', 'Descripción del recurso 1', 'foto1.jpg', 'Datos del recurso 1', 100, 'EmpresaA');

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa)
VALUES ('Recurso 2', 'Descripción del recurso 2', 'foto2.jpg', 'Datos del recurso 2', 50, 'EmpresaA');

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa)
VALUES ('Recurso 3', 'Descripción del recurso 3', 'https://example.com/foto3.jpg', 'Datos del recurso 3', 80, 'EmpresaB');

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa)
VALUES ('Recurso 4', 'Descripción del recurso 4', 'foto4.jpg', 'Datos del recurso 4', 120, 'EmpresaB');

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa)
VALUES ('Recurso 5', 'Descripción del recurso 5', 'foto5.jpg', 'Datos del recurso 5', 80, 'EmpresaC');

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa)
VALUES ('Recurso 6', 'Esta es una descripción muy larga que tiene más de 100 caracteres y se trunca para ajustarse a la restricción de longitud', 'foto6.jpg', 'Datos del recurso 6', 90, 'EmpresaC');


INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa)
VALUES ('Recurso 7', 'Descripción del recurso 7','foto7.jpg', 'Datos del recurso 4', 70, 'EmpresaA');
