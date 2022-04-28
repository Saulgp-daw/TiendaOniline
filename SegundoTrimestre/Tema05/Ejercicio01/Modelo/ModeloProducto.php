<?php

namespace SegundoTrimestre\Tema05\Ejercicio01\Modelo;
use Producto;
use mysqli;
use mysqli_result;

class ModeloProducto{
    private static mysqli $conexion;

    public static function consulta(string $sql){
        self::$conexion = new mysqli("localhost", "usuario", "productos2021", "productos");
        if (self::$conexion->connect_errno != 0) {
            echo "Error estableciendo conexión";
            exit(1);
        }
        $resultado = self::$conexion->query($sql);
        if ($resultado == null) {
            echo "Error en la consulta: $sql";
            exit(2);
        }
        return $resultado;
    }

    public static function devolverUltimoId(){
        $query = self::consulta("SELECT MAX(id) FROM producto");
        $res = $query->fetch_assoc();
        return intval($res['MAX(id)']+1);

    }
    public static function cantidadProductos():int{
        $res=ModeloProducto::consulta("SELECT COUNT(*) As cantidadProductos from producto");
        $count = $res->fetch_assoc();
        return intval($count['cantidadProductos']);
    }

    public static function assocToProducto(array $ap){

    }

    public static function listaProductos(int $numPag=1, int $tamPag=10):array{
        $comienzo = ($numPag-1)*$tamPag;
        $sql = "Select * from producto limit $comienzo, $tamPag";
        $resultado = ModeloProducto::consulta("Select * from producto limit $comienzo, $tamPag");
        $listaProductos = [];
        while($p=$resultado->fetch_assoc()){
            $listaProductos[]=$p;
        }
        return $listaProductos;
    }

    public static function mensajeError($mensaje){
        echo "<br><span style='color:red; font-size: 3em'>$mensaje</span>";
    }

    public static function insertarProducto($p) : bool{
        if($p->id != null){
            $productoABuscar = ModeloProducto::consulta("Select * from producto where id=".$p->id);
            if($productoABuscar->fetch_assoc() != null){
                return false;
            }
            $id = $p->id;
            $descripcion = $p->descripcion;
            $nombre = $p->nombre;
            $precio = $p->precio;
            $imagen = $p->imagen;
            self::consulta("Insert into producto values($id, '$descripcion', '$nombre', $precio, '$imagen')");
            return true;
        }
    }

    public static function borrarProducto(int $id) : bool{
        self::consulta("delete from producto where id='$id'");
        return self::$conexion->affected_rows;
    }

    public static function actualizarProducto($p) : bool{
        $sql="update producto set ";
        $atributos=$p->getAtributos();
        foreach ($atributos as $clave => $valor) {
            $sql .= " $clave='$valor',";
        }
        $sql = substr($sql, 0, strlen($sql)-1);
        $sql.=" where id=".$p->id;
        self::consulta($sql);
        return self::$conexion->affected_rows;
    }
}

//fcrinav@gobiernodecanarias.org