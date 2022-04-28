<?php
    namespace Examen\Vista;
    use Examen\Modelo\Articulo;
    use Examen\Modelo\BlogDB;
    require_once("../Modelo/Articulo.php");
    require_once("../Modelo/BlogDB.php");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Examen</title>
    <link href="../Vista/css/blog.css" rel="stylesheet" type="text/css">
</head>
<body>
    <header>
        <h1>Articulos Publicados</h1>
    </header>
  
    <span>Num. artículos Pág. 
    <?php
         echo "<select id='tamPag'>";
         for($i = 5; $i <= 20; $i = $i+5){
             if($i == $tamPag){
                 echo "<option selected>$i</option>";
             }else{
                 echo "<option>$i</option>";
             }
         }
         echo "</select>";

    ?>
    </span> 
    <span>Páginas: </span>
    <?php
        echo "<select id='paginado'>";
        for($i = 1; $i < $numTotalPags; $i++){
            if($i == $pagActual){
                echo "<option selected>$i</option>";
            }else{
                echo "<option>$i</option>";
            }
        }
        echo "</select>";

    ?>
    <div class="tabla">
    <table border='1'>
    <tr>
        <th>Fecha</th>
        <th>Título</th>
    </tr>
    <?php
        foreach ($listaDeArticulos as $articulo) {
            $id = $articulo['id'];
            echo "<tr>";
            echo "<td>".$articulo['fecha'] . "</td>";
            echo "<td> <a href='detalleArticulo.php?id=$id'>".$articulo['titulo'] . "</a></td>";
            echo "</tr>";
        }


    ?>
    </table>
    </div>
   
    <footer>
        Blog
    </footer>

</body>
<script>
    var selectPaginado = document.getElementById("paginado");
    console.log(document.location);
    selectPaginado.addEventListener("change", function() {
        document.location = "?pag="+this.value;
    });

    var selectTam = document.getElementById("tamPag");
    selectTam.addEventListener("change", function() {
        document.location = "?tamPag="+this.value;
    });


</script>
</html>