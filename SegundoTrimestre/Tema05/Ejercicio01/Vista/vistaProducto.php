<?php
    namespace SegundoTrimestre\Tema05\Ejercicio01\Vista;
    use SegundoTrimestre\Tema05\Ejercicio01\Modelo\Producto;
    use SegundoTrimestre\Tema05\Ejercicio01\Modelo\ModeloProducto;
    require_once("../Modelo/ModeloProducto.php");
    require_once("../Modelo/Producto.php");
?>
<!doctype html>
<html lang="en">
  <head>
    <title>Title</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS v5.0.2 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  </head>
  <body>
  <?php
    //var_dump($listaProductos);
    echo "<table>";
    echo "<tr>";
    echo "<th>id</th>";
    echo "<th>Nombre</th>";
    echo "<th>Descripcion</th>";
    echo "<th>imagen</th>";
    echo "<th>precio</th>";
    echo "</tr>";
    foreach ($listaProductos as $producto) {
        echo "<tr id='fila_".$producto['id']."'>";
        echo "<td><input type='text' name='id' value='".$producto['id']."' readonly='readonly'/></td>";
        echo "<td><input type='text' name='nombre' value='".$producto['nombre']."' readonly='readonly'/></td>";
        echo "<td><input type='text' name='descripcion' value='".$producto['descripcion']."' readonly='readonly'/></td>";
        echo "<td><input type='text' name='imagen' value='".$producto['imagen']."' readonly='readonly'/></td>";
        echo "<td><input type='number' name='precio' value='".$producto['precio']."' readonly='readonly'/></td>";
        echo "<td><button id='modificar_".$producto['id']."' class='btn btn-warning' onClick='ModificarFila(". $producto['id'].")'>Modificar</button></td>";
        echo "<td><button class='btn btn-danger' onClick='eliminarFila(". $producto['id'].")'>Borrar</button></td>";
        echo "</tr>\n";
    }
    echo "</table>";
    echo "<a class='btn btn-primary' href='?pag=" , $pagActual-1 , "'> < </a>";
    echo "<a class='btn btn-primary' href='?pag=" , $pagActual+1 , "'> > </a>";
    echo "<br>";

    echo "<table>";
    echo "<tr id='insertar'>";
    echo "<td><input type='text' name='id' value='$ultimoId' readonly='readonly'/></td>";
    echo "<td><input type='text' name='nombre' style='background-color:#faed8e;'/></td>";
    echo "<td><input type='text' name='descripcion' style='background-color:#faed8e;'/></td>";
    echo "<td><input type='text' name='imagen' style='background-color:#faed8e;'/></td>";
    echo "<td><input type='number' name='precio' style='background-color:#faed8e;'/></td>";
    echo "<td><button class='btn btn-success' onClick='insertarFila()' >Enviar</button></td>";
    echo "<tr>";
    echo "</table>";






   
    

?>
    <!-- Bootstrap JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    <script src="../JS/Funcionalidad.js"></script>
  </body>
</html>