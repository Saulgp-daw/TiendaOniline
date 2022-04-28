<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejercicio01</title>
</head>
<body>
    <?php
    if($_POST){
        if(isset($_POST['num1']) && isset($_POST['num2']) ){
            $num1 = $_POST['num1'];
            $num2 = $_POST['num2'];
            $suma = 0;
            $producto = 1;
            $media = 0;
            $contarMedia = 0;
            
            for($i = $num1; $i <= $num2; $i++){
                $suma += $i;
                $producto *= $i;
                $contarMedia += 1;
            }
            $media = ($suma / $contarMedia);
            echo "<table border='1'>";
            echo "<tr>";
            echo "<th>Suma</th>";
            echo "<td>$suma</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<th>Producto</th>";
            echo "<td>$producto</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<th>Media</th>";
            echo "<td>$media</td>";
            echo "</tr>";
            echo "</table>";
        }
        

    }else{
?>
    <form action="" method="post">
        <label for="num1">1er numero: </label>
        <input type="number" name="num1"><br>
        <label for="num2">2º numero: </label>
        <input type="number" name="num2"><br>
        <input type="submit" value="Enviar">
    </form>
<?php
    }

?>
</body>
</html>