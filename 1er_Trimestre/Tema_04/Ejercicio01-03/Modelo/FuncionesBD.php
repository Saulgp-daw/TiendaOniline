<?php
    require_once("../../../config.php");
    function getBaseDatos(){
        return DATA_PATH."/bdUsuarios.txt";
    }

    function consulta(string $nombreUsuario){
        $dataBase = getBaseDatos();
        if(file_exists($dataBase)){
            $handle=fopen($dataBase, "r");
            while($linea=fgets($handle)){
                $datos=json_decode($linea, true);
                if($datos['usuario'] == $nombreUsuario){
                    return $datos;
                }
            }
            fclose($handle);
        }
        return false;
    }

    function insertar(array $datos): bool{
        if(consulta($datos['usuario'])){
            return false;
        }
        $dataBase = getBaseDatos();
        $handle = fopen($dataBase, "a");
        if(!$handle){
            return false;
        }
        $datos['contrasenha'] = password_hash($datos['contrasenha'], PASSWORD_BCRYPT);
        fputs($handle, json_encode($datos, JSON_UNESCAPED_UNICODE) . "\n");
        fclose($handle);
        return true;
    }

    function borrado(string $nick):bool{
        if(!consulta($nick)){
            echo "<span style='color: red;'>Usuario con el nick $nick no existe</span>";
            return false;
        }
        $bdTemp = tempnam(DATA_PATH, "/bdUsuarioTmp");
        $ficheroEntrada = fopen(getBaseDatos(), "r");
        $ficheroSalida = fopen($bdTemp, "w");
        while($linea = fgets($ficheroEntrada)){
            if(!str_contains( $linea, "\"usuario\":\"$nick\"" )){
                fputs($ficheroSalida, $linea . "\n");
            }
        }
        fclose($ficheroEntrada);
        fclose($ficheroSalida);
        unlink(getBaseDatos());
        return rename($bdTemp, getBaseDatos());
    }

    function modificar(array $nuevosDatosUsuario):bool{
        if(!borrado($nuevosDatosUsuario['usuario'])){
            return false;
        }
        return insertar($nuevosDatosUsuario);
    }



?>