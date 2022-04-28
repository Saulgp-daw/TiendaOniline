<?php
require_once("autenticado.php");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu</title>
</head>

<body>
    <?php
        function getCampos(){
            return ['nombre', 'apellido1', 'apellido2', 'usuario', 'email'];
        }
        function getDatosForm($camposReadOnly = null, $usuario = null){
            $campos = getCampos();
            $datosForm = [];
            $datosUsuario = null;
            if($camposReadOnly == null){
                $camposReadOnly = [];
            }else if($camposReadOnly == "all"){
                $camposReadOnly = $campos;
            }else{
                $camposReadOnly = explode(",", $camposReadOnly);
            }

            if($usuario != null){
                require_once("../Modelo/FuncionesBD.php");
                $datosUsuario = consulta($usuario);
            }
            foreach ($campos as $campo) {
                
                $value = $datosUsuario[$campo];

            }
        }

        if($_GET){
            $opcion = $_GET['opcion'];
            if($opcion == 'alta'){
                $datosForm=['nombre' => ["", ""], 'apellido1' => ["", ""], 'apellido2' => ["", ""],'usuario' => ["", ""], 'contrasenha' => ["", ""], 'email' => ["", ""]];
                require_once("../Vista/Formulario.php");
            }elseif($opcion == 'verPerfil'){
                $datosForm=['nombre' => [$datosUsuario['nombre'], "readonly"], 'apellido1' => ["", "readonly"], 'apellido2' => ["", "readonly"],'usuario' => ["", "readonly"], 'contrasenha' => ["", "readonly"], 'email' => ["", "readonly"]];
                require_once("../Vista/Formulario.php");
            }elseif($opcion == "modificarPerfil"){
                $datosForm=['nombre' => ["", ""], 'apellido1' => ["", ""], 'apellido2' => ["", ""],'usuario' => ["", "readonly"], 'contrasenha' => ["", ""], 'email' => ["", ""]];
                require_once("../Vista/Formulario.php");
            }
        }else{
            if ($_SESSION['usuario'] == 'admin') {
                //$usuario = $_SESSION['usuario'];
                echo "<p><a href='?opcion=alta'>Dar de alta</a></p>"; //dar de alta usuario
    
            }
            echo "<p><a href='?=opcion=verPerfil'>Ver tu perfil</a></p>"; //ver perfil
            echo "<p><a href='?=opcion=modificarPerfil'>Modificar Perfil</a></p>"; //modificar perfil
        }

        





    ?>
</body>

</html>