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
    empresa VARCHAR(100),
    id_empresa INT (10)
);

CREATE TABLE Usuarios (
    nombre_usuario VARCHAR(100) NOT NULL PRIMARY KEY,
    contrasena VARCHAR(100),
    fecha_nacimiento DATE,
    puesto_trabajo VARCHAR(100),
    empresa VARCHAR(100), 
    id_empresa INT (10),
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
    id_empresa INT (10),
    id_recursoservicio INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE Reservas (
    fecha DATE, 
    hora TIME,
    nombre_empresa VARCHAR(100),
    id_empresa INT (10),
    nombre_usuario VARCHAR(100),
    nombre_rs VARCHAR(100),
    id_recursoservicio INT (100),
    id_reserva INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY
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
    id_recursoservicio INT(10),
    id_reserva INT(10),
    FOREIGN KEY (id_recursoservicio) REFERENCES RecursoServicio(id_recursoservicio),
    FOREIGN KEY (id_reserva) REFERENCES Reservas(id_reserva),
    PRIMARY KEY (id_recursoservicio, id_reserva)
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



INSERT INTO Usuarios (nombre_usuario, contrasena, fecha_nacimiento, puesto_trabajo, empresa, tipo, id_empresa)
VALUES ('Juan', 'password123', '1990-05-15', 'Desarrollador', 'EmpresaA', 1, 1),
       ('María', 'secret456', '1985-08-20', 'Gerente de Ventas', 'EmpresaB', 2, 2),
       ('Pedro', 'qwerty789', '1995-02-10', 'Analista de Datos', 'EmpresaC', 1, 3),
       ('Luisa', 'abcd1234', '1992-11-30', 'Ejecutiva de Cuentas', 'EmpresaA', 0, 1),
       ('Ana', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'EmpresaC', 2, 3),
       ('Eva', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'EmpresaA', 2, 1),
       ('Carla', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'EmpresaB', 2, 2),
       ('Ramon', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'EmpresaC', 2, 3),
       ('Elsa', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'EmpresaA', 2, 1),
       ('Clara', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'EmpresaB', 2, 2),
       ('Ivan', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'EmpresaC', 2, 3),
       ('Antonio', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'EmpresaA', 2, 1),
       ('David', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'EmpresaB', 2, 2),
       ('Jesus', 'passw0rd', '1998-07-25', 'Diseñadora Gráfica', 'EmpresaC', 2, 3),
       ('Carlos', 'secure789', '1994-03-12', 'Desarrollador Full Stack', 'EmpresaB', 1, 2);


INSERT INTO solicitud (nombre_empresa, datos_de_contacto, descripcion, logo, nombre_admi_general, id_empresa, direccion, estado)
VALUES ('EmpresaD', 'contacto@empresa-d.com', 'Descripción de la Empresa D', 'logo-empresa-x.png',  'Luisa', 0, ' ', 'Pendiente'),
       ('EmpresaE', 'contacto@empresa-e.com', 'Descripción de la Empresa E', 'logo-empresa-y.png', 'Luisa', 0, ' ',  'Aceptada'),
       ('EmpresaF', 'contacto@empresa-f.com', 'Descripción de la Empresa F', 'logo-empresa-x.png',  'Luisa', 0, ' ', 'Pendiente'),
       ('EmpresaG', 'contacto@empresa-g.com', 'Descripción de la Empresa G', 'logo-empresa-y.png', 'Luisa', 0, ' ',  'Aceptada'),
       ('EmpresaH', 'contacto@empresa-h.com', 'Descripción de la Empresa H', 'logo-empresa-x.png',  'Luisa', 0, ' ', 'Pendiente'),
       ('EmpresaI', 'contacto@empresa-i.com', 'Descripción de la Empresa I', 'logo-empresa-y.png', 'Luisa', 0, ' ',  'Aceptada'),
       ('EmpresaJ', 'contacto@empresa-j.com', 'Descripción de la Empresa J', 'logo-empresa-x.png',  'Luisa', 0, ' ', 'Pendiente'),
       ('EmpresaK', 'contacto@empresa-k.com', 'Descripción de la Empresa K', 'logo-empresa-y.png', 'Luisa', 0, ' ',  'Aceptada'),
       ('EmpresaL', 'contacto@empresa-l.com', 'Descripción de la Empresa L', 'logo-empresa-z.png', 'Luisa', 0, ' ', 'Rechazada'),
       ('EmpresaM', 'contacto@empresa-m.com', 'Descripción de la Empresa M', 'logo-empresa-z.png', 'Luisa', 0, ' ', 'Rechazada');


INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 1', 'Descripción del recurso 1', '/assets/img/foto1.png', 'Datos del recurso 1', 100, 'EmpresaA', 1);

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 2', 'Descripción del recurso 2', '/assets/img/foto2.jpg', 'Datos del recurso 2', 50, 'EmpresaA', 1);

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 3', 'Descripción del recurso 3', '/assets/img/foto3.jpg', 'Datos del recurso 3', 80, 'EmpresaB', 2);

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 4', 'Descripción del recurso 4', '/assets/img/foto4.png', 'Datos del recurso 4', 120, 'EmpresaB', 2);

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 5', 'Descripción del recurso 5', '/assets/img/foto5.png', 'Datos del recurso 5', 80, 'EmpresaC', 3);

INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 6', 'Esta es una descripción muy larga que tiene más de 100 caracteres y se trunca para ajustarse a la restricción de longitud', '/assets/img/foto6.png', 'Datos del recurso 6', 90, 'EmpresaC', 3);


INSERT INTO RecursoServicio (nombre_rs, descripcion, foto, datos, aforo, nombre_empresa, id_empresa)
VALUES ('Recurso 7', 'Descripción del recurso 7','/assets/img/foto7.png', 'Datos del recurso 4', 70, 'EmpresaA', 1);


INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-20', '10:00:00', 'EmpresaA', 'Eva', 'Recurso 2', 2, 1);   

INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-21', '15:30:00', 'EmpresaB', 'Carla', 'Recurso 3', 3, 2);

INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-22', '14:45:00', 'EmpresaC', 'Ramon', 'Recurso 5', 5, 3);

INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-23', '09:15:00', 'EmpresaA', 'Elsa', 'Recurso 2', 2, 1);

INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-24', '12:00:00', 'EmpresaB', 'Clara', 'Recurso 3',3, 2);

INSERT INTO Reservas (fecha, hora, nombre_empresa, nombre_usuario, nombre_rs, id_recursoservicio, id_empresa)
VALUES ('2023-07-24', '16:00:00', 'EmpresaB', 'Clara', 'Recurso 3', 3, 2);


