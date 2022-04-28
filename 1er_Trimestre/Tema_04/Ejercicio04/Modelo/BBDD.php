<?php
    require_once("Producto.php");
    function obtenerProductos(){
        return [ 
            new Producto("Pelikan", "Descripción pelikan", 234.4, "pelikan.png", 1),
            new Producto("Parker", "Descripción Parker", 345, "parker.png", 2),
            new Producto("Visconti", "Descripción Visconti", 100, "visconti.png", 3)
        ];
    }


?>