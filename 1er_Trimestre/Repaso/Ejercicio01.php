/*Ejercicio 1 - Programa que reciba por "GET" número de filas (f) y número de columnas (c) y
muestre formulario para pedir 2 matrices de fxc y que al enviar los datos muestre la suma de ambas
(ampliar para el producto de matrices)*/
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        if($_POST){
            function sumaMatrices($matrizA, $matrizB){
                
            }
        }else if($_GET){
            function imprimirMatriz($filas, $cols, $nombreMatriz){
                echo "<table>";
                for($i = 0; $i < $filas; $i++){
                    echo "<tr>";
                    for($j = 0; $j < $cols; $j++){
                        $valor = $i+$cols+$j;
                        echo "<td><input type='number' name='$nombreMatriz" . "[$i][]' value='$valor' maxlength='4' size='4'/></td>";
                    }
                    echo "</tr>";
                }
                echo "</table>";         
            }
            $filas = $_GET['num_filas'];
            $cols = $_GET['num_cols'];


            echo "<form action='' method='post' enctype='multipart/form-data'>
                    <table> 
                        <tr>
                            <td>";
                            imprimirMatriz($filas, $cols, 'a');
            echo           "</td>
                            <td>";
                            imprimirMatriz($filas, $cols, 'a');
            echo           "</td>
                        </tr>
                    </table>
                    <tr>
                        <td><button type='submit'>Enviar</button></td>
                        <td><button type='reset'>Reset</button></td>
                    </tr>
                </form>";

        }else{
    ?>
        <form action="" method="get" enctype='multipart/form-data'>
            <label for="num_filas">Nº de filas:</label>
            <input type="number" name="num_filas" size="4" min="1" max="20"><br>
            <label for="num_cols">Nº de columnas:</label>
            <input type="number" name="num_cols" size="4" min="1" max="20"><br>
            <input type="submit" value="Enviar">
        </form>
    <?php
        }
    ?>
</body>
</html>