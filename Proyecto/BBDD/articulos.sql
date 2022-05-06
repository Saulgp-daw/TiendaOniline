DROP DATABASE IF EXISTS proyecto;
CREATE DATABASE proyecto DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL ON proyecto.* TO 'admin'@'localhost';

use proyecto;

CREATE TABLE articulos (
  id int(6) auto_increment,
  descripcion varchar(200) not null,
  nombre varchar(40) UNIQUE not null,
  precio decimal(8,2) not null,
  imagen varchar(90) not null,
  categoria varchar(40) not null,
  estado varchar(20) not null,
  stock int not null,
  PRIMARY KEY(id)
) ENGINE=InnoDB;
  
INSERT INTO articulos VALUES
(0, 'Leche de 300ml','Leche',3.45,'https://i.imgur.com/su814k1.jpg','Alimentos','Disponible', 33),
(0, 'Pack de media docena','Huevos',2.4,'https://i.imgur.com/ty8OyAG.png','Alimentos','Disponible', 40),
(0, 'Manzana verde','Manzana',0.5,'https://i.imgur.com/CZyoJ0q.jpg','Alimentos', 'Disponible',100),
(0, 'Arroz de grano largo','Arroz',1.0,'https://i.imgur.com/siATVIy.png','Alimentos', 'Disponible',45),
(0, 'Aceite de Oliva virgen extra','Aceite de Oliva',4.6,'https://i.imgur.com/3ELuW70.jpg','Alimentos', 'Disponible',22),
(0, 'Delicioso pan recién horneado al horno de leña','Pan',0.3,'https://i.imgur.com/Lw395BH.jpg','Alimentos', 'Disponible',10),
(0, 'Consumo: A++. Lavadora de última generación','Lavadora',324,'https://i.imgur.com/AmHP51b.jpg','Electrodomesticos', 'Disponible',30),
(0, 'Consumo: A+. Secadora de última generación','Secadora',230.77,'https://i.imgur.com/cTdfU5h.jpg','Electrodomesticos', 'Disponible',30),
(0, 'Plancha para la ropa delicada','Plancha',54.99,'https://i.imgur.com/GodXhmO.png','Electrodomesticos', 'Disponible',30),
(0, 'TV de 42" y resolución 4K','Televisión',300.23,'https://i.imgur.com/cLjNRDN.jpg','Electrodomesticos', 'Disponible',30),
(0, 'Incluye 4 niveles de tostado y de tiempo','Tostadora',50,'https://i.imgur.com/Y5nB6ET.png','Electrodomesticos', 'Disponible',30),
(0, 'Potencia de hasta 4400kw/h, ideal para calentar comidas congeladas','Microondas',120.6,'https://i.imgur.com/FWBRMgA.jpg','Electrodomesticos', 'Agotado',0),
(0, '400ml. Ideal para ropa blanca y de color','Lejía',1.22,'https://i.imgur.com/hUVtAuy.jpg','Drogueria', 'Disponible',67),
(0, 'Gel corporal 250ml. Con olor de avena y miel','Gel de ducha',1.0,'https://i.imgur.com/fj0oqHG.jpg','Drogueria', 'Disponible',44),
(0, '100ml. Ideal para ventanas y lunas de coche','Limpiacristales',2.6,'https://i.imgur.com/F8WJMuX.jpg','Drogueria', 'Agotado',0),
(0, 'Rollo de doble capa de 12uds.','Papel Higiénico',1.4,'https://i.imgur.com/jFDgUBd.jpg','Drogueria', 'Disponible',56),
(0, '300ml. Con una rociada todo tipo de insectos morirán de inmediato','Insecticida',0.8,'https://i.imgur.com/31EWEkO.jpg','Drogueria','Disponible', 88),
(0, '200ml. Perfecto quitagrasas para la vajilla del hogar','Jabón de fregar',1.2,'https://i.imgur.com/YrjQolM.png','Drogueria', 'Disponible',44),
(0, '100ml. Delicioso zumo de manzana 99%','Zumo de manzana',1.2,'https://i.imgur.com/22Yn4Pr.jpg','Bebidas', 'Agotado',0),
(0, '100ml. 2 uds.','Refresco de cola',2.0,'https://i.imgur.com/UV5a2tu.jpg','Bebidas', 'Disponible',32),
(0, '100ml. 2 uds.','Refresco de Naranja',2.1,'https://i.imgur.com/YqtYusQ.jpg','Bebidas', 'Disponible',90),
(0, '100ml. 2 uds té helado inglés','Té helado',1.5,'https://i.imgur.com/hbbY1PY.png','Bebidas', 'Disponible',79),
(0, '100ml. 2 uds.','Agua',1.0,'https://i.imgur.com/WrlfuEB.jpg','Bebidas', 'Disponible',120),
(0, '130ml. Botella originaria de Francia','Vino',23.0,'https://i.imgur.com/vEX4y78.png','Bebidas', 'Disponible',5),
(0, 'Pack de latas de 100ml. 6uds.','Cerveza',4.0,'https://i.imgur.com/di2RKkQ.jpg','Bebidas', 'Disponible',24),
(0, 'Silla robusta de madera, perfecta para el hogar y exterior','Silla de madera',34.0,'https://i.imgur.com/wLh6hfo.jpg','Hogar', 'Disponible',34),
(0, 'Mesa de cristal refinado. 100x300','Mesa de Cristal',78.0,'https://i.imgur.com/ZEQykgg.jpg','Hogar', 'Disponible',43),
(0, 'Cuero de material sintético y resistente','Sillón de cuero',143.99,'https://i.imgur.com/vYRyYMr.jpg','Hogar', 'Disponible',20),
(0, 'Contiene 2 cajones y espacio para torreta de ordenador y monitor','Escritorio de Oficina',100.0,'https://i.imgur.com/9y1DI0X.jpg','Hogar', 'Disponible',10),
(0, 'Consumo: A. Lavados rápidos y eficaces','Vajilla de porcelana',214.7,'https://i.imgur.com/Hlbx4hv.jpg','Hogar', 'Disponible',54),
(0, 'Pack de 3 toallas de 1,5m de altura','Toalla de baño',31.0,'https://i.imgur.com/NoW9Euj.jpg','Hogar', 'Agotado',0),
(0, 'Botella individual de 100ml','Cerveza Sin Alcohol',3.0,'https://i.imgur.com/cqBSsis.png','Bebidas', 'Disponible',10),
(0, '100% zumo de manzana con gaseosa. 200ml','Appleteiser',2.4,'https://i.imgur.com/PBu5O2j.jpg','Bebidas', 'Agotado',0),
(0, 'Botella individual de 300ml','Tónica',31.0,'https://i.imgur.com/ibfYSjJ.jpg','Bebidas', 'Disponible',20),
(0, 'Delicioso refresco de fresa 400ml','Refresco de fresa',31.0,'https://i.imgur.com/acGk5N4.png','Bebidas', 'Disponible',40),
(0, 'Los mejores mangos exprimidos de cuba en un tetrabrick de 300ml','Jugo de mango',31.0,'https://i.imgur.com/4PYCfoD.jpg','Bebidas', 'Disponible',23);

CREATE TABLE usuarios (
  email varchar(20) not null,
  contrasenha varchar(150) not null,
  nombre varchar(200) not null,
  apellidos varchar(40) not null,
  direccion varchar(90) not null,
  codigo_postal int(5) unsigned not null,
  telefono_fijo int(9) unsigned not null,
  pais varchar(40) not null,
  PRIMARY KEY(email)
) ENGINE=InnoDB;

insert into usuarios values 
('saulgp1@gmail.com', '1234', 'Saul', 'Gonzalez Perez', 'Los Realejos', 38410, 922202122, 'España');