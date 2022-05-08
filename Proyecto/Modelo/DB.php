<?php
require_once("../Modelo/Articulo.php");
require_once("../Modelo/Usuario.php");

class DB{
    private static PDO $conexion;

    public static function consulta(string $sql){
        try{
            [$host, $user, $pwd, $db] = ["localhost", "admin", "admin", "proyecto"];
            self::$conexion = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pwd);
            self::$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            if(strpos(strtoupper(trim($sql)), "SELECT")>= 0){
                $resultado = self::$conexion->query($sql);
            }else{
                $resultado = self::$conexion->exec($sql);
            }
            if($resultado==null){
                echo "Error en la consulta: $sql";
                exit(2);
            }
            return $resultado;
        }catch(PDOException $exception){
            exit("<br/>Error: ".$exception->getMessage() . "<br/>");
        }
    }

    public static function cantidadArticulos(string $categoria = null):string{
        $sentencia = "select count(*) As cantidadProductos from articulos";;

        if($categoria != null){
           $sentencia .= " where categoria='$categoria'";
        }
        $res=self::consulta($sentencia);
        $count = $res->fetch(PDO::FETCH_ASSOC);
        return intval($count['cantidadProductos']);
    }

    public static function listaArticulos(int $numPag=1, int $tamPag=10, string $categoria="todos"):String{
        $comienzo = ($numPag-1)*$tamPag;
        //$sql = "Select * from articulos limit $comienzo, $tamPag";
        if($categoria == "todos"){
            $resultado = self::consulta("Select * from articulos limit $comienzo, $tamPag");
        }else{
            $resultado = self::consulta("Select * from articulos where categoria='$categoria' limit $comienzo, $tamPag");
        }
        
        $listaProductos = [];
        while($p=$resultado->fetch(PDO::FETCH_ASSOC)){
            $listaProductos[]=$p;
        }
        return json_encode($listaProductos);
    }

    public static function devolverCategorias(){
        //select distinct categoria from articulos;
        $resultado = self::consulta("Select distinct categoria from articulos");
        $listaCategorias = [];
        while($categoria=$resultado->fetch(PDO::FETCH_ASSOC)){
            $listaCategorias[]=$categoria;
        }
        return json_encode($listaCategorias);
    }

    public static function devolverArticulo(int $id){
        $sql = "Select * from articulos where id=$id";
        $resultado = self::consulta($sql);
        while($articulo = $resultado->fetch(PDO::FETCH_ASSOC)){
            return json_encode($articulo);
        }
    }

    public static function convertirAObjeto($array){
        $email = $array['email'];
        $contrasenha = $array['contrasenha'];
        $nombre = $array['nombre'];
        $apellidos = $array['apellidos'];
        $direccion = $array['direccion'];
        $codigo_postal = $array['codigo_postal'];
        $telefono_fijo = $array['telefono_fijo'];
        $pais = $array['pais'];
        return new Usuario($email, $contrasenha, $nombre, $apellidos, $direccion, $codigo_postal, $telefono_fijo, $pais);
    }

    public static function mensajeError($mensaje){
        echo "<br><span style='color:red; font-size: 3em'>$mensaje</span>";
    }

    public static function loginUsuario(string $email, string $contrasenha): string{
        $sql = "select * from usuarios where email='".$email."'";
        $resultado = self::consulta($sql);
        while($usuario = $resultado->fetch(PDO::FETCH_ASSOC)){
            $objetoUsuario = self::convertirAObjeto($usuario);
            if(password_verify($contrasenha, $objetoUsuario->contrasenha)){
                 return json_encode($usuario);
            }
        }

        return '{"resultado": "not_found"}';
    }

    public static function registroUsuario(string $email, string $contrasenha, string $nombre, string $apellidos, string $direccion, int $codigo_postal, int $telefono_fijo, string $pais){
        if(func_num_args() == 8){
            foreach(func_get_args() as $arg){
                if(empty($arg) || $arg == null){
                    return "campos_vacios";
                }
            }
            $articuloABuscar = self::consulta("select * from usuarios where email='".$email."'");
            if($articuloABuscar->fetch(PDO::FETCH_ASSOC) != null){
                return "usuario_existente";
            }
            $sql = "insert into usuarios values ('$email', '$contrasenha', '$nombre', '$apellidos', '$direccion', $codigo_postal, $telefono_fijo, '$pais')";
            self::consulta($sql);
            return "exito";
        }else{
            return "num_argumentos";
        }
    }

}

//fcrinav@gobiernodecanarias.org