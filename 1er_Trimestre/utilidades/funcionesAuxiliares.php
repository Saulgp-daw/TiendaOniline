<?php
require_once("../config.php");
function sumaMatrices($a, $b)
{
    if (count($a) != count($b) || count($a[0]) != count($b[0])) {
        return false;
    }
    $res = [];
    for ($i = 0; $i < count($a); $i++) {
        for ($j = 0; $j < count($a[0]); $j++) {
            $res[$i][$j] = $a[$i][$j] +  $b[$i][$j];
        }
    }
    return $res;
}

function multiplicarMatrices($a, $b)
{
    //Dos matrices se pueden multiplicar si el número de columnas de A coincide con el de filas de B
    $columnasA = count($a[0]);
    $filasB = count($b);
    //nos aseguramos que el tamaño de las columnas de A y filas de B coinciden
    if ($columnasA != $filasB) {
        echo "No se puede multiplicar! las dimensiones no coinciden";
        return false;
    }
    $res = [];

    //queremos que la i sea menor que las columnas y j que sea menor que las filas, por lo que la matriz resultado debe ser
    //de la misma dimensión que el cáĺculo de las otras dos
    for ($i = 0; $i < $columnasA; $i++) {
        for ($j = 0; $j < $filasB; $j++) {
            //como hacemos la suma contínua debemos resetear i, j antes de sumar la siguiente tanda o si no irá acumulando la suma
            $res[$i][$j] = 0;
            //la parte más importante, K representa la dirección que debe tomar para multiplicar, por lo que para la 
            //matrizA debe ser la columnas (el segundo corchete) el que se mueve y para la matrizB las filas(primer corchete) 
            for ($k = 0; $k < count($a); $k++) {
                $res[$i][$j] += $a[$i][$k] * $b[$k][$j];
            }
        }
    }
    return $res;
}

function imprimirMatriz($matriz)
{
    echo "<table border='1'>";
    for ($i = 0; $i < count($matriz); $i++) {
        echo "<tr>";
        for ($j = 0; $j < count($matriz[0]); $j++) {
            echo "<td style='padding: 3px; text-align: right;'>",  $matriz[$i][$j], "</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
}

function mostrarImgNum($num, $width = 0.25)
{
    $relativePath = "/imgNumeros/" . $num . ".png";
    $urlFile = ROOT_PATH . $relativePath;
    $realFile = __DIR__ . "/..$relativePath";
    $newWidth = intval(getimagesize($realFile)[0] * $width);
    echo "<img src='$urlFile' width='$newWidth'/>";
}

function _mostrarImgNum($num)
{
    $num = strval($num);
    for ($i = 0; $i < strlen($num); $i++) {
        mostrarImgNum($num[$i]);
    }
}

function mostrarFechaActual($fecha = null)
{
    $claves = ['year', 'mon', 'mday'];
    crearTabla($claves, $fecha);
}

function mostrarHoraActual($fecha = null)
{
    $claves = ['hours', 'minutes', 'seconds'];
    crearTabla($claves, $fecha);
}

function crearTabla($claves, $fecha = null)
{
    date_default_timezone_set('Atlantic/Canary');
    if ($fecha == null) {
        $fecha = getdate();
    }
    echo "<table>
                <tr>";
    foreach ($claves as $c) {
        echo "<td>";
        if ($fecha[$c] < 10) {
            _mostrarImgNum(0);
        }
        _mostrarImgNum($fecha[$c]);
        echo "</td>";
    }
    echo "  </tr>
            </table>";
}

function tablaToHtml($array, $indice = false)
{
    echo "<table>";
    foreach ($array as $elemento) {
        echo "<tr>";
        if($indice){
            echo "<td>$indice</td>";
        }
        echo "<td> $elemento </td></tr>";
    }
    echo "</table>";
}

//generar un array de número aleatorio
function devolverAleatorio(int $min, int $max, int $cantidad, bool $ordenado=false):array{
    $array = [];
    do{
        $num = rand($min, $max);
        if(!in_array($num, $array)){
            array_push($array, $num);
        }
    }while(count($array) < $cantidad);

    if($ordenado){
        sort($array);
    }

    return $array;
}
function abrirFichero($filePath, $modo="r+"){
    $resultado = fopen($filePath, $modo);
    if($resultado){
        return $resultado;
    }
    echo "<span style='color: red'>No se ha podido abrir el fichero.</span>";
    exit(1);
    
}

function lecturaContador(){
    $contador = 0;
    $fcontador = DATA_PATH."/contador.txt";
    if(file_exists($fcontador)){
        $file = abrirFichero($fcontador);
        $contador = intval(fgets($file));
        fseek($file, 0);
    }else{
        $file = abrirFichero($fcontador, "w+");
    }
    $contador++;
    fwrite($file, strval($contador));
    fclose($file);
    return $contador;
}