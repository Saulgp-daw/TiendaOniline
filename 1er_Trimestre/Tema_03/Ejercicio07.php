<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    require_once("../config.php");
    require_once("../utilidades/funcionesAuxiliares.php");
    function generaFila($linea, $separador=";"){
        static $tipoCelda = "th";
        //$linea = substr($linea, 0, strlen($linea)-1);//quita el salto de línea al final
        $campos = explode($separador, $linea);
        echo "<tr>";
        foreach ($campos as $campo) {
            echo "<$tipoCelda>$campo</$tipoCelda>";
        }
        echo "</tr>";
        if($tipoCelda == "th"){
            $tipoCelda = "td";
        }
    }

    function csvATabla($file){
        $handle = fopen($file, "r");
        echo "<table border='1'>\n";
        while($linea = fgets($handle)){
            generaFila($linea);
        }
        echo "</table>\n";
        fclose($handle);
    }

    function filecsvToTabla($file){
        $lineas = file_get_contents($file);
        txtToTabla($lineas);
    }
    function txtToTabla($cadena){
        $lineas = preg_split("/[\r]?[\n]/", $cadena);
        echo "<table border='1'>\n";
        foreach ($lineas as $linea) {
            generaFila($linea);
        }
        echo "</table>\n";
    }

    if ($_FILES) {
        $filePath = $_FILES['myfile']['tmp_name']; //tmp_name es el nombre temporal de nuestro fichero
        $dataPath = DATA_PATH . "/" . $_FILES['myfile']['name']; 
        move_uploaded_file($filePath, $dataPath ); //esto nos moverá nuestro archivo a una carpeta con permisos para el usuario
        filecsvToTabla($dataPath);
    }else if($_POST['textarea']){
        txtToTabla($_POST['textarea']);
    } else {
    ?>
        <div>
            <form action="" method="post" enctype="multipart/form-data">
                <label for='myfile'>Selecciona un archivo</label>
                <input type="file" id="myfile" name="myfile">
                <button type="submit">Subir</button>
            </form>
        </div>

        <div>
            <form action="" method="post" enctype="multipart/form-data">
                <label for='myfile'>Pegue el csv: </label> <br>
                <textarea name="textarea" id="textarea" cols="60" rows="15"></textarea>
                <button type="submit">Pegar</button>
            </form>
        </div>

    <?php
    }

    ?>
</body>

</html>