<?php
    if(!defined('__CONFIG__')){//si config no está definido entra
        define('__CONFIG__', true); //no tiene importancia el valor de config, es por asignar los valores
        define('ROOT_PATH', '/PHP/DWES');//para url de cosas que se encuentren en el apache
        define("PROJECT_PATH", "/var/www/html/PHP/DWES");//tenemos que usar esta url porque nuestros config no se encuentra en el servidor apache sino en nuestros ficheros locales
        define("DATA_PATH", "/var/www/phpdata"); //para ficheros que se encuentren fuera de nuestro proyecto para que nadie pueda acceder a ellos

    }
    
    
?>