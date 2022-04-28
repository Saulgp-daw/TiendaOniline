<?php
//Ejercicio 3 - Programa que genere un número aleatorio de 5 cifras y lo muestre con imágenes

    require_once("../config.php");

    function random(){
        $numeros = [];
        
        while(count($numeros) < 6 ){
            $n = rand(1, 9);
            if(!in_array($n, $numeros)){
                array_push($numeros, $n);
            }
            sort($numeros);
        }
        return $numeros;
    }
    $numeros = random();
    print_r($numeros);
    
    for($i = 0; $i < count($numeros); $i++){
        echo "<img src='" . ROOT_PATH ."/imgNumeros/" . $numeros[$i] . ".png' height='40px'>";
    }

    
?>

