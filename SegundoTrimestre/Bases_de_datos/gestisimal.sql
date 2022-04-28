DROP DATABASE IF EXISTS gestisimal;
CREATE DATABASE gestisimal DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
CREATE USER IF NOT EXISTS 'gestisimal'@'localhost' IDENTIFIED BY 'gestisimal2021';
GRANT ALL ON gestisimal.* TO 'gestisimal'@'localhost';

use gestisimal;

CREATE TABLE producto (
  codigo VARCHAR(4),
  descripcion VARCHAR(40) NOT NULL,
  pcompra DECIMAL(7,2) NOT NULL,
  pventa DECIMAL(7,2) NOT NULL,
  stock INT NOT NULL,
  PRIMARY KEY(codigo)
) ENGINE=InnoDB;

INSERT INTO producto VALUES
('h001', 'Varilla roscada 0.50m.', 7.00, 10.00, 9),
('h005', 'Caja tuercas 16mm.', 21.00, 25.05, 20),
('h006', 'Chapa galvanizada', 10.50, 20.55, 3),
('h007', 'Barra para cortina 2,00 m.', 10.30, 22.33, 5),
('h008', 'Perfil metalico en L longitud 2m.', 23.30, 32.50, 5),
('h009', 'Perfil metalico en U longitud 3m.', 28.30, 52.50, 10),
('h020', 'Barra acero 16mm. longitud 6m.', 35.30, 45.40, 50),
('m001', 'Estantería para pared.', 25.30, 30.60, 5),
('m002', 'Tablero pino 1x2m.', 10.00, 15.00, 20),
('m003', 'Puerta paso 0.72m.', 85.50, 110.55, 5),
('m004', 'Puerta de 0.62m.', 70.50, 90.50, 10),
('m005', 'Puerta blindada 0.82m.', 205.81, 258.33, 2),
('m006', 'Puerta doble hoja 1.2m.', 140.50, 192.30, 3);