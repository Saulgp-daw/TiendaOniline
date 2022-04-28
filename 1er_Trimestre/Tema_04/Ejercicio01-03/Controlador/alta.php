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
        //require_once("../../config.php");
        require_once("../Modelo/FuncionesBD.php");
        
        function procesaDatosPost():array {
            return [
                "nombre" => $_POST['nombre'],
                "apellido1" => $_POST['apellido1'],
                "apellido2" => $_POST['apellido2'],
                "usuario" => $_POST['usuario'],
                "contrasenha" => $_POST['contrasenha'],
                "email" => $_POST['email']
            ];
        }

        if($_POST){
            $datos = procesaDatosPost();
            if(insertar($datos)){
                echo "<span style='color: blue'>Datos insertados correctamente</span>";
            }else{
                echo "<span style='color: red'>Error insertando datos</span>";
            }
            //$datosJSON = json_encode($datos, JSON_UNESCAPED_UNICODE);
        }

    ?>
</body>
</html>