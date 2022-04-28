
<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8">
    <title>Operaciones matrices</title>
    </head>
    <body>
    	
    </body>
</html>
<?php
    if($_POST){
        require_once ('../utilidades/funcionesAuxiliares.php');
        $a = $_POST['a']; $b = $_POST['b'];
        $c = sumaMatrices($a, $b);
        //$s = [[1, 2], [3, 4], [2, 1]];
        //$z = [[1, 2, 3], [1, 2, 3]];
        $d = multiplicarMatrices($a, $b);
        
        function contenidoHTML($a, $b, $c, $valor){
            echo "<table>
                <tr>
                    <td>";
                        imprimirMatriz($a);
            echo    "</td>
                    <td>$valor</td>
                    <td>";
                        imprimirMatriz($b);
            echo "      </td>
                    <td>=</td>
                    <td>";
                        imprimirMatriz($c);
            echo "  </td>
                 </tr>
            </table>";
        }
        
        contenidoHTML($a, $b, $c, "+");
        
        if($d){
            contenidoHTML($a, $b, $d, "X");
        }
        
        
    }else if($_GET){
        function imprimirTablaMatriz($filas, $cols, $nombre){
            echo "<table>";
            for($i = 0; $i < $filas; $i++){
                echo "<tr>";
                for($j = 0; $j < $cols; $j++){
                    $valor = $i+$cols+$j;
                    echo "<td><input type='number' name='$nombre". "[$i][]' value='$valor' maxlength='4' size='4' /></td>";
                }
                echo "</tr>";
            }
            echo "</table>";
        }
        
        $filas = $_GET["filas"];
        $cols = $_GET["cols"];
        
        
        echo "<form action='' method='post' enctype='multipart/formdata'>
                <table>
                    <tr>
                        <td>";
                            imprimirTablaMatriz($filas, $cols, "a");
        echo "          </td>
                        <td>";
                            imprimirTablaMatriz($filas, $cols, "b");
        echo "           </td>
                    </tr>
                </table>";
        
        echo "<tr>
                <td><button type='submit'>Enviar</button></td>
                <td><button type='reset'>Reset</button></td>
              </tr>";
    }else{
        ?>
        <form action='' method='get' enctype='multipart/form-data'>
    		<table>
    			<tr>
    				<td><label for='filas'>Filas: </label></td>
    				<td><input type="number" name="filas" id="filas" min="1" max="20" size="4"></td>
    			</tr>
    			<tr>
    				<td><label for="cols">Columnas: </label></td>
    				<td><input type="number" name="cols" id="cols" min="1" max="20" size="4"></td>
    			</tr>
    			<tr>
    				<td><button type="submit">Enviar</button></td>
    			</tr>
    		</table>
    	</form>
        <?php 
    }
?>