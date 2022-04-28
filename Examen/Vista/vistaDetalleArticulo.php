<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle Articulo</title>
    <link href="../Vista/css/detalleArticulo.css" rel="stylesheet" type="text/css">
</head>
<body>
    <?php
        echo "<div class='cabecera'>";
        echo "<h2>" . $articulo->titulo . "</h2>";
        echo "<h4>" . $articulo->fecha . "</h4>";
        echo "</div>";
        echo "<hr>";
        echo "<p>" . $articulo->contenido . "</p>";
        echo "<hr>";
        echo "<a href='javascript:history.back();'>Volver</a>";
    ?>
    
</body>
</html>