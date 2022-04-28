<?php
    namespace SegundoTrimestre\Tema05\Ejercicio3_4\Vista;
    use SegundoTrimestre\Tema05\Ejercicio3_4\Modelo\Producto;
    use SegundoTrimestre\Tema05\Ejercicio3_4\Modelo\ModeloProducto;
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
        echo "<table  class='table table-striped'>";
        echo "<tr>";
        echo "<th>codigo</th>";
        echo "<th>Descripcion</th>"; 
        echo "<th>pcompra</th>";
        echo "<th>pventa</th>";
        echo "<th>Margen</th>";
        echo "<th colspan='6'>stock</th>";
        echo "</tr>";
        foreach ($listaProductos as $producto) {
            $codigo = $producto['codigo'];
            $descripcion = $producto['descripcion'];
            $pcompra = $producto['pcompra'];
            $pventa = $producto['pventa'];
            $stock = $producto['stock'];
            $margen = floatval($pventa) - floatval($pcompra);

            echo "<tr id='fila_$codigo'>";
            echo "<td><input type='text' name='codigo' value='$codigo' readonly='readonly'/></td>";
            echo "<td><input type='text' name='descripcion' value='$descripcion' readonly='readonly'/></td>";
            echo "<td><input type='number' name='pcompra' value='$pcompra' readonly='readonly'/></td>";
            echo "<td><input type='number' name='pventa' value='$pventa' readonly='readonly'/></td>";
            echo "<td><input type='number' name='margen' value='$margen' readonly='readonly'/></td>";
            echo "<td><input type='number' name='stock' value='$stock' readonly='readonly'/></td>";
            echo "<td><button id='modificar_$codigo' class='btn btn-warning' onClick='ModificarFila(\"". $codigo."\")'>Modificar</button></td>";
            echo "<td><button class='btn btn-danger' onClick='eliminarFila(\"". $codigo."\")'>Borrar</button></td>";
            echo "<td><button class='btn btn-primary' onClick='editarStock(\"". $codigo."\")'>
            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-box-arrow-in-right' viewBox='0 0 16 16'>
            <path fill-rule='evenodd' d='M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z'/>
            <path fill-rule='evenodd' d='M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'/>
          </svg> Entrada</button></td>";
            echo "<td>
                    <button class='btn btn-primary' onClick='editarStock(\"". $codigo."\", \"disminuir\")'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-box-arrow-right' viewBox='0 0 16 16'>
                      <path fill-rule='evenodd' d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z'/>
                      <path fill-rule='evenodd' d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'/>
                      </svg> Salida
                    </button>
                  </td>";
            echo "<td><button class='btn btn-info' onClick='agregarCarrito(\"". $codigo."\")'>Comprar</button></td>";
            echo "</tr>\n";
        }
        echo "</table>";
        echo "<a class='btn btn-primary' href='?pag=" , 1 , "'> |< </a>";
        echo "<a class='btn btn-primary' href='?pag=" , $pagActual-1 , "'> < </a>";
        echo "<a class='btn btn-primary' href='?pag=" , $pagActual+1 , "'> > </a>";
        echo "<a class='btn btn-primary' href='?pag=" , $numTotalPags, "'> >|</a>";
        echo "<br>";

        echo "<table class='table table-striped'>";
        echo "<tr>";
        echo "<th>codigo</th>";
        echo "<th>Descripcion</th>"; 
        echo "<th>pcompra</th>";
        echo "<th>pventa</th>";
        echo "<th></th>";
        echo "<th>stock</th>";
        echo "</tr>";
        echo "<tr id='insertar'>";
        echo "<td><input type='text' name='codigo' style='background-color:#faed8e;'/></td>";
        echo "<td><input type='text' name='descripcion' style='background-color:#faed8e;'/></td>";
        echo "<td><input type='text' name='pcompra' style='background-color:#faed8e;'/></td>";
        echo "<td><input type='number' name='pventa' style='background-color:#faed8e;'/></td>";
        echo "<td></td>";
        echo "<td><input type='number' name='stock' style='background-color:#faed8e;'/></td>";
        echo "<td><button class='btn btn-success' onClick='insertarFila()' >Enviar</button></td>";
        echo "<tr>";
        echo "</table>";
      ?>
      <h3>Carrito: </h3>
      <div id="miCarrito"></div>
    
  </body>
  <!-- Bootstrap JavaScript Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    <script src="../JS/Funcionalidad.js"></script>
</html>