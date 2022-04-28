<?php

namespace SegundoTrimestre\Tema05\Ejercicio3_4\Modelo;
use Producto;
use PDO;

class ModeloProducto{
    private static PDO $conexion;

    public static function consulta(string $sql){
        try{
            [$host, $user, $pwd, $db] = ["localhost", "gestisimal", "gestisimal2021", "gestisimal"];
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
            exit("<br/>Error: ".$ex->getMessage() . "<br/>");
        }
    }
/*
    public static function devolverUltimoId(){
        $query = self::consulta("SELECT MAX(id) FROM producto");
        $res = $query->fetch(PDO::FETCH_ASSOC);
        return intval($res['MAX(id)']+1);

    }*/
    public static function cantidadProductos():int{
        $res=ModeloProducto::consulta("SELECT COUNT(*) As cantidadProductos from producto");
        $count = $res->fetch(PDO::FETCH_ASSOC);
        return intval($count['cantidadProductos']);
    }

    public static function assocToProducto(array $ap){

    }

    public static function listaProductos(int $numPag=1, int $tamPag=10):array{
        $comienzo = ($numPag-1)*$tamPag;
        $sql = "Select * from producto limit $comienzo, $tamPag";
        $resultado = ModeloProducto::consulta("Select * from producto limit $comienzo, $tamPag");
        $listaProductos = [];
        while($p=$resultado->fetch(PDO::FETCH_ASSOC)){
            $listaProductos[]=$p;
        }
        return $listaProductos;
    }

    public static function mensajeError($mensaje){
        echo "<br><span style='color:red; font-size: 3em'>$mensaje</span>";
    }

    public static function insertarProducto($p) : bool{
        if($p->codigo != null){
            $productoABuscar = ModeloProducto::consulta("Select * from producto where codigo='".$p->codigo."'");
            if($productoABuscar->fetch(PDO::FETCH_ASSOC) != null){
                return false;
            }
            $codigo = $p->codigo;
            $descripcion = $p->descripcion;
            $pcompra = $p->pcompra;
            $pventa = $p->pventa;
            $stock = $p->stock;
            self::consulta("Insert into producto values('$codigo', '$descripcion', '$pcompra', '$pventa', '$stock')");
            return true;
        }
    }

    public static function borrarProducto(string $codigo) : bool{
        return self::consulta("delete from producto where codigo='$codigo'")->rowCount();
        //return self::$conexion->affected_rows;
    }

    public static function actualizarProducto($p) : bool{
        $sql="update producto set ";
        $atributos=$p->getAtributos();
        foreach ($atributos as $clave => $valor) {
            $sql .= " $clave='$valor',";
        }
        $sql = substr($sql, 0, strlen($sql)-1);
        $sql.=" where codigo='".$p->codigo."'";
        return self::consulta($sql)->rowCount();
        //return self::$conexion->rowCount();
    }
}

//fcrinav@gobiernodecanarias.org