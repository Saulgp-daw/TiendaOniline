DROP DATABASE IF EXISTS productos;
CREATE DATABASE productos DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
CREATE USER IF NOT EXISTS 'usuario'@'localhost' IDENTIFIED BY 'productos2021';
GRANT ALL ON productos.* TO 'usuario'@'localhost';

use productos;

CREATE TABLE producto (
  id int(6) auto_increment,
  descripcion varchar(200) not null,
  nombre varchar(40) UNIQUE not null,
  precio decimal(8,2) not null,
  imagen varchar(40) not null,
  PRIMARY KEY(id)
) ENGINE=InnoDB;
  
INSERT INTO producto VALUES
(1,'Es capaz de escribir más de 10000 páginas con una solo recarga.<br/>En el estuche original vienen 5 recargas.','Pelikan Soruvëran M-1000',545,'pelikan.png'),
(2,"Es capaz de escribir más de 1000 páginas con una solo recarga.<br/>En el estuche original vienen 2 recargas.",'Parker Duofold International',406,'parker.png'),
(3,"Es capaz de escribir más de 100 páginas con una solo recarga.<br/>En el estuche original vienen 1 recarga.",'Visconti Van Gogh',180,'visconti.png');

