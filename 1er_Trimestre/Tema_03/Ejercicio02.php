<?php
/*Ejercicio 2 - Programa que muestre en una <table> los seis números ordenados de un sorteo de la
primitiva (números aleatorios entre [1,49]). Mostrar la fecha y la hora del sorteo.*/


    require_once("../config.php");

    function primitiva(){
        $numeros = [];
        
        while(count($numeros) < 6 ){
            $n = rand(1, 49);
            if(!in_array($n, $numeros)){
                array_push($numeros, $n);
            }
            sort($numeros);
        }
        return $numeros;
    }

    $numeros = primitiva();
    
    foreach ($numeros as $num) {
        echo $num;
    }

    echo "<br>Hoy es " . date("Y/m/d") . "<br>";
    echo "Con la hora " . date("H:i:sa");
    
    
?>

