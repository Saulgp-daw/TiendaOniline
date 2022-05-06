<?php
require_once("../Modelo/Articulo.php");

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
        $id = $array['id'];
        $fecha = $array['fecha'];
        $titulo = $array['titulo'];
        $contenido = $array['contenido'];
        return $articulo = new Articulo($id, $titulo, $fecha, $contenido);
    }

    public static function mensajeError($mensaje){
        echo "<br><span style='color:red; font-size: 3em'>$mensaje</span>";
    }

    public static function loginUsuario(string $email, string $contrasenha): string{
        $sql = "select * from usuarios where email='$email' and contrasenha='$contrasenha'";
        $resultado = self::consulta($sql);
        while($usuario = $resultado->fetch(PDO::FETCH_ASSOC)){
            return json_encode($usuario);
        }
    }

    public static function registroUsuario(string $email, string $contrasenha, string $nombre, string $apellidos, string $direccion, int $codigo_postal, int $telefono_fijo, string $pais){
        if(func_num_args() == 8){
            foreach(func_get_args() as $arg){
                if(empty($arg) || $arg == null){
                    return false;
                }
            }
            $articuloABuscar = self::consulta("select * from usuarios where email='".$email."'");
            if($articuloABuscar->fetch(PDO::FETCH_ASSOC) != null){
                return false;
            }
            $sql = "insert into usuarios values ('$email', '$contrasenha', '$nombre', '$apellidos', '$direccion', $codigo_postal, $telefono_fijo, '$pais')";
            self::consulta($sql);
            return true;
        }else{
            return false;
        }
    }

}

//fcrinav@gobiernodecanarias.org