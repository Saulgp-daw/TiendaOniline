<?php
require_once("../Modelo/Articulo.php");
require_once("../Modelo/Usuario.php");

class DB{
    private static PDO $conexion;

    /**
     * La función que conectará con nuestra base de datos, usaremos la extensión PDO
     * Hay dos credenciales, las de local y las de producción
     * Si hay un error haremos uso de excepciones que se nos mostrará en pantalla 
     */
    public static function consulta(string $sql): Object{
        try{
            [$host, $user, $pwd, $db] = ["localhost", "admin", "admin", "proyecto"]; 
            /*[$host, $user, $pwd, $db] = ["localhost", "id18957893_admin", "yPs{MVP?OB-$*+N1", "id18957893_proyecto"];*/
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

    /**
     * Esta función nos devolverá la cantidad de artículos dependiendo de la categoria que le pasaremos, si categoria es vacío pero no null simplemente mostrará todos
     * los productos que tengamos
     */
    public static function cantidadArticulos(string $categoria = null):string{
        $sentencia = "select count(*) As cantidadProductos from articulos";;

        if($categoria != null){
           $sentencia .= " where categoria='$categoria'";
        }
        $res=self::consulta($sentencia);
        $count = $res->fetch(PDO::FETCH_ASSOC);
        return intval($count['cantidadProductos']);
    }

    /**
     * Esta función recibirá 3 parámetros pero estarán los tres inicializados por defecto
     * dependiendo si la categoria es todos o no, haremos una consulta sql filtrando esa categoria
     * calcularemos el comienzo de los productos a buscar con el número de página actual y el tamaño de cuántos artículos se desea mostrar de una tacada
     * finalmente recorreremos con un fetch el resultado de la consulta y lo guardaremos en un array al que retornaremos con un json encode
     */
    public static function listaArticulos(int $numPag=1, int $tamPag=10, string $categoria="todos"):string{
        $comienzo = ($numPag-1)*$tamPag;
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

    /**
     * La consulta distinct de mysql devolverá las categorías únicas de los artículos
     * como hicimos con la función 'listaArticulos' recorreremos con un fetch el resultado y devolveremos un json_encode del array
     */
    public static function devolverCategorias(): string{
        $resultado = self::consulta("Select distinct categoria from articulos");
        $listaCategorias = [];
        while($categoria=$resultado->fetch(PDO::FETCH_ASSOC)){
            $listaCategorias[]=$categoria;
        }
        return json_encode($listaCategorias);
    }

    /**
     * Esta función recibirá un id que será único y devolverá un array con los artículos dicho id
     * como es único solo devolverá uno. Esta función devuelve al array y no el string del json_encode porque lo usaremos más adelante
     * en el mismo modelo
     */
    public static function devolverArticulo(int $id): Array{
        $sql = "Select * from articulos where id=$id";
        $resultado = self::consulta($sql);
        while($articulo = $resultado->fetch(PDO::FETCH_ASSOC)){
            return $articulo;
        }
    }

    /**
     * Esta función recibirá un email que será único y devolver un array con 
     * los usuarios que coincidan con 
     */
    public static function devolverUsuario(string $email): Array{
        $sql = "select * from usuarios where email='".$email."'";
        $resultado = self::consulta($sql);
        while($usuario = $resultado->fetch(PDO::FETCH_ASSOC)){
            return $usuario;
        }
    }

    /**
     * Haremos uso de esta función que recibirá un array de una consulta y lo convertirá y devolverá como un objeto Usuario
     */
    public static function convertirAObjetoUsuario($array): Usuario{
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
    /**
     * Haremos uso de esta función que recibirá un array de una consulta y lo convertirá y devolverá como un objeto Articulo
     */
    public static function convertirAObjetoArticulo($array): Articulo{
        $id = $array['id'];
        $descripcion= $array['descripcion'];
        $nombre= $array['nombre'];
        $precio= $array['precio'];
        $imagen= $array['imagen'];
        $categoria= $array['categoria'];
        $estado= $array['estado'];
        $stock= $array['stock'];
        return new Articulo($id, $descripcion, $nombre, $precio, $imagen, $categoria, $estado, $stock);
    }

    /**
     * Esta función simplemente mostrará el mensaje de error que posiblemente tengamos por pantalla
     */
    public static function mensajeError($mensaje){
        echo "<br><span style='color:red; font-size: 3em'>$mensaje</span>";
    }

    /**
     * Para hacer el login recibiremos un email y contraseña y devolverá un string de json
     * Primero haremos una consulta buscando el email, que en nuestra base de datos será único
     * Haremos un fetch del resultado y convertiremos el array en un objeto usuario
     * finalmente hacemos uso de la función propia para verificar que el parametro contraseña pasado es el mismo que el del objeto usuario
     * si lo es devolvemos un json del usuario, si no saldremos del bucle y resultado será 'not_found'
     */
    public static function loginUsuario(string $email, string $contrasenha): string{
        $sql = "select * from usuarios where email='".$email."'";
        $resultado = self::consulta($sql);
        while($usuario = $resultado->fetch(PDO::FETCH_ASSOC)){
            $objetoUsuario = self::convertirAObjetoUsuario($usuario);
            if(password_verify($contrasenha, $objetoUsuario->contrasenha)){
                 return json_encode($usuario);
            }
        }
        return '{"resultado": "not_found"}';
    }

    /**
     * Recibimos todos los parámetros necesarios para insertar un usuario en la base de datos
     */
    public static function registroUsuario(string $email, string $contrasenha, string $nombre, string $apellidos, string $direccion, int $codigo_postal, int $telefono_fijo, string $pais){
        if(func_num_args() == 8){
            foreach(func_get_args() as $arg){
                if(empty($arg) || $arg == null){
                    return "campos_vacios";
                }
            }
            $usuarioABuscar = self::consulta("select * from usuarios where email='".$email."'");
            if($usuarioABuscar->fetch(PDO::FETCH_ASSOC) != null){
                return "usuario_existente";
            }
            $sql = "insert into usuarios values ('$email', '$contrasenha', '$nombre', '$apellidos', '$direccion', $codigo_postal, $telefono_fijo, '$pais')";
            self::consulta($sql);
            return "exito";
        }else{
            return "num_argumentos";
        }
    }

    public static function actualizarUsuario(string $email, string $contrasenha, string $nombre, string $apellidos, string $direccion, int $codigo_postal, int $telefono_fijo, string $pais): string{
        if(func_num_args() == 8){
            foreach(func_get_args() as $arg){
                if(empty($arg) || $arg == null){
                    return "campos_vacios";
                }
            }
            $usuario = self::convertirAObjetoUsuario(self::devolverUsuario($email));
            if(password_verify($contrasenha, $usuario->contrasenha)){
                $sql = "update usuarios set nombre='".$nombre.
                "', apellidos='".$apellidos.
                "', direccion='".$direccion.
                "', codigo_postal='".$codigo_postal.
                "', telefono_fijo='".$telefono_fijo.
                "', pais='".$pais."' where email='".$email."'";
                self::consulta($sql);
                return "exito";
           }else{
               return "contrasenha_incorrecta";
           }
        }else{
            return "num_argumentos";
        }
    }

    public static function borrarUsuario(string $email, string $contrasenha){
        if(!empty($email) && $email != null || !empty($contrasenha) && $contrasenha != null){
            $usuario = self::convertirAObjetoUsuario(self::devolverUsuario($email));
            if(password_verify($contrasenha, $usuario->contrasenha)){
                $sql = "delete from usuarios where email='".$email."'";
                self::consulta($sql);
                return "borrado_exito";
           }else{
                return "contrasenha_incorrecta";
            }
        }else{
            return "num_argumentos";
        }
    }

    public static function actualizarArticulo(int $id, int $cantidad = 0){
        if(!empty($id) && $id != null){
            $articulo = self::convertirAObjetoArticulo(self::devolverArticulo($id));
            if($articulo){
                $estado = "Disponible";
                if($cantidad >= $articulo->stock){
                    $cantidad = $articulo->stock;
                    $estado = "Agotado";
                }
                $cantidad = $articulo->stock - $cantidad; 
                $sql = "update articulos set stock=$cantidad, estado='".$estado."' where id=$id";
                return self::consulta($sql)->rowCount();
            }
        }
    }

    public static function listarArticulosAleatorios(int $cantidad){
        if(!empty($cantidad) && $cantidad != null){
            $resultado = self::consulta("Select * from articulos order by rand() limit $cantidad");
        
            $listaProductos = [];
            while($p=$resultado->fetch(PDO::FETCH_ASSOC)){
                $listaProductos[]=$p;
            }
            return json_encode($listaProductos);
        }
    }

}

//fcrinav@gobiernodecanarias.org