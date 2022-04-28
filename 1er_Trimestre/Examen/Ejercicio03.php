<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicio03</title>
</head>
<body>
    <div>
        <form action="" method="post" enctype="multipart/form-data">
            <label for='myfile'>Selecciona un archivo</label>
            <input type="file" id="myfile" name="myfile">
            <button type="submit">Subir Fichero</button>
        </form>
    </div>
    <?php
    if($_FILES){
        $filePath = $_FILES['myfile']['tmp_name'];
        
        crearTabla($filePath);
    }


    function crearTabla($rutaFichero){
        $fichero = $rutaFichero;
        $handle=fopen($fichero,"r");
        echo "<table border='1'>";
        echo "<tr>";
            echo "<th>DNI</th>";
            echo "<th>Nombre</th>";
            echo "<th>Apellido 1</th>";
            echo "<th>Apellido 2</th>";
            echo "<th>Edad</th>";
            echo "<th>Telefono</th>";
            echo "<th>Ciudad</th>";
        echo "</tr>";
        while($linea=fgets($handle)) { 
            $usuario = json_decode($linea);
            echo "<tr>";
                echo "<td>$usuario->dni</td>";
                echo "<td>$usuario->nombre</td>";
                echo "<td>$usuario->ap1</td>";
                echo "<td>$usuario->ap2</td>";
                echo "<td>$usuario->edad</td>";
                echo "<td>$usuario->telef</td>";
                echo "<td>$usuario->ciudad</td>";
                if(!validarDNI($usuario->dni)){
                    echo "<td>No valido</td>";
                }
               

            echo "</tr>";
        }
        echo "</table>";
    }

    function validarDNI($dni){
        $letra = substr($dni, -1);
        $numeros = substr($dni, 0, 8);
        $mensaje = "No valido";
        $cadenaComprobar = "TRWAGMYFPDXBNJZSQVHLCKE";
        $cadenaArray = str_split($cadenaComprobar);
        $posLetra = $numeros % 23;

        if($cadenaArray[$posLetra] == $letra){
            return true;
        }
        return false;
         
    }
   
?>
</body>
</html>