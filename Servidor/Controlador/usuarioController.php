<?php
    require_once("header.php");

     /**
     * recogemos los valores enviados desde angular para tratar con los datos, comprobando antes si se encuentran datos en estos
     * llamaremos luego a la BBDD y dependiendo del resultado de la operación devolveremos un JSON.
     */
    
    if(isset($_GET['actualizar'])){
        $postdata = file_get_contents("php://input");
        if(isset($postdata) && !empty($postdata)){
            $request = json_decode($postdata);
            $email = trim($request->email);
            $contrasenha = trim($request->contrasenha);
            $nombre = trim($request->nombre);
            $apellidos = trim($request->apellidos);
            $direccion = trim($request->direccion);
            $codigo_postal =  intval(trim($request->codigo_postal));
            $telefono_fijo =  intval(trim($request->telefono_fijo));
            $pais = trim($request->pais);
            $resultadoOperacion = DB::actualizarUsuario($email, $contrasenha, $nombre, $apellidos,$direccion, $codigo_postal, $telefono_fijo, $pais);
            if($resultadoOperacion){
                echo '{ "resultado" : "'. $resultadoOperacion.'" }';
            }
        }
    }

    if(isset($_GET['borrar'])){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        if(isset($postdata) && !empty($postdata)){
            $email = trim($request->email);
            $contrasenha = trim($request->contrasenha);
            $resultadoOperacion = DB::borrarUsuario($email, $contrasenha);
            if($resultadoOperacion){
                echo '{ "resultado" : "'. $resultadoOperacion.'" }';
            }
        }
    }

    if(isset($_GET['login'])){
        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        if(isset($postdata) && !empty($postdata)){
            $email = trim($request->email);
            $contrasenha = trim($request->contrasenha);
            echo DB::loginUsuario($email, $contrasenha);
        }
    }

    if(isset($_GET['registro'])){
        $postdata = file_get_contents("php://input");
        if(isset($postdata) && !empty($postdata)){
            $request = json_decode($postdata);
            $email = trim($request->email);
            $contrasenha = password_hash(trim($request->contrasenha), PASSWORD_BCRYPT);
            $nombre = trim($request->nombre);
            $apellidos = trim($request->apellidos);
            $direccion = trim($request->direccion);
            $codigo_postal = trim($request->codigo_postal);
            $telefono_fijo = trim($request->telefono_fijo);
            $pais = trim($request->pais);
            $resultadoOperacion = DB::registroUsuario($email, $contrasenha, $nombre, $apellidos,$direccion, $codigo_postal, $telefono_fijo, $pais);
            if($resultadoOperacion){
                echo '{ "resultado" : "'. $resultadoOperacion.'" }';
            }
        }
    }

    if(isset($_GET['devolverUsuario'])){
        $email = $_GET['devolverUsuario'];
        echo json_encode(DB::devolverUsuario($email));
    }





?>