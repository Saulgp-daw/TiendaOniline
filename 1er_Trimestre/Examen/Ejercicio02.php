<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicio02</title>
</head>
<body>
    <?php
    $fichero = "./recursos/notasAlumnos.txt";
    $handle=fopen($fichero,"r");
    
    $asociativo = [];
    while($linea=fgets($handle)) { 
        $campos = explode(",", $linea);
        if($campos[1] != 10){
            $asociativo["0".$campos[1]]=$campos;
        }else{
            $asociativo[$campos[1]]=$campos;
        }
        
    }
    fclose($handle);
    ksort($asociativo);
    $otro = array_reverse($asociativo);
    echo "<table border='1'>";
    echo "<tr>";
        echo "<th>Alumno</th>";
        echo "<th>Nota</th>";
    foreach ($otro as $key => $value) {
        echo "<tr>";
        echo "<td>". $value[0]."</td>";
        echo "<td>$key</td>";
        echo "</tr>";
    }
    echo "</table>";
    
?>
</body>
</html>