<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo</title>
</head>
<body>
    <?php
        function lineaProducto($producto){
            static $primeraLinea = true;
            if($primeraLinea){
                echo "<tr>";
                foreach ($producto as $key => $value) {
                    $nombreCampo = ucfirst($key);
                    echo "<th><a style='display:block;' href='?orden=$key'>", $nombreCampo ,"</a></th>\n";
                }
                echo "</tr>";
                $primeraLinea = false;
            }
            echo "\t<tr>\n";
            foreach ($producto as $key => $value) {
                echo "\t\t<td>$value</td>\n";
            }
            echo "\t</tr>\n";
        }


        [$host, $usuario, $pass, $bd] = ['localhost', 'usuario', 'productos2021', 'productos'];
        $conexion = new mysqli($host, $usuario, $pass, $bd);
        if(!$conexion){
            echo "Error en la conexión";
            exit(1);
        }

        $sql = "select * from producto";
        if(isset($_GET['orden'])){
            $sql .= "ORDER BY ". $_GET['orden'];
        }

        $resultado = $conexion->query($sql);
        if(!$resultado){
            echo "Error ejecutando consulta";
        }
        echo "<table border='1'>\n";

        while($producto=$resultado->fetch_assoc()){
            lineaProducto($producto);
        }
        echo "</table>\n";
        
    ?>
</body>
</html>