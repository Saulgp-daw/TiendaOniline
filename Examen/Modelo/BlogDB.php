<?php
require_once("../Modelo/Articulo.php");

class BlogDB{
    private static PDO $conexion;

    public static function consulta(string $sql){
        try{
            [$host, $user, $pwd, $db] = ["localhost", "blog", "blog2022", "blog"];
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

    public static function cantidadArticulos():int{
        $res=self::consulta("SELECT COUNT(*) As cantidadProductos from articulos");
        $count = $res->fetch(PDO::FETCH_ASSOC);
        return intval($count['cantidadProductos']);
    }

    public static function listaArticulos(int $numPag=1, int $tamPag=10):array{
        $comienzo = ($numPag-1)*$tamPag;
        //$sql = "Select * from articulos limit $comienzo, $tamPag";
        $resultado = self::consulta("Select * from articulos limit $comienzo, $tamPag");
        $listaProductos = [];
        while($p=$resultado->fetch(PDO::FETCH_ASSOC)){
            $listaProductos[]=$p;
        }
        return $listaProductos;
    }

    public static function devolverArticulo(int $id){
        $sql = "Select * from articulos where id=$id";
        $resultado = self::consulta($sql);
        while($articulo = $resultado->fetch(PDO::FETCH_ASSOC)){
            return self::convertirAObjeto($articulo);
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

}

//fcrinav@gobiernodecanarias.org