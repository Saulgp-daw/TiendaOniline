<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .blanco {
            background-color: white;
        }

        .negro {
            background-color: black;
        }

        .diagonal {
            background-color: #198bd5;
        }

        td{
            padding: 10px;
        }
    </style>
    <script>
        function recargar(id) {
            document.location = "?id=" + id;
        }
    </script>
</head>

<body>
    <?php
    require_once("../config.php");


    function idToCoord(String $id, int $filas): array
    {
        //e8 --> [4,0]
        $letra = preg_split("/[0-9]+/", $id, -1, PREG_SPLIT_NO_EMPTY)[0];
        $numero = preg_split("/[a-z]+/", $id, -1, PREG_SPLIT_NO_EMPTY)[0];
        $coordX = ord($letra) - ord("a");
        $coordY = $filas - intval($numero);
        return [$coordX, $coordY];
    }

    function coordToId(array $coord, int $filas): string
    {
        //[4,0] => "e8"
        return chr(ord('a')+$coord[0]).strval($filas-$coord[1]);
    }

    function celdaPerteneceDiagonal(array $original, array $celda, float $pendiente = 1): bool
    {
        return $original[0] - $celda[0] == $pendiente * ($original[1] - $celda[1]);

    }
    function estaEnLinea(array $original, array $celda){
        return abs($original[0]-$celda[0]) == abs($original[1]-$celda[1]);
    }
    function dibujarTablero(int $filas = 8, int $cols = 8, String $id = null): void
    {

        echo "<table border='1'>";
        for ($i = 0; $i < $filas; $i++) { //y
            echo "<tr>";
            echo "<th>", $filas-$i, "</th>";
            for ($j = 0; $j < $cols; $j++) { //x
                $idActual = coordToId([$j, $i], $filas);
                echo "<td id='$idActual' onclick='recargar(this.id);' class='";
                if($id != null && ([$coordX, $coordY]=idToCoord($id, $filas)) && estaEnLinea([$coordX, $coordY], [$j, $i])){
                    echo "diagonal";
                }else{
                    $color = (($i+$j)%2 == 0) ? "blanco" : "negro";
                    echo $color;
                }
                echo "'></td>";
            }
            echo "</tr>";
        }
        echo "<tr><th></th>";
        for($j=0; $j < $cols; $j++){
            echo "<th>", chr(ord('a')+$j), "</th>";
        }
        echo "</tr>";
        echo "</table>";
    }
    $filas=$cols=8;
    if($_GET && isset($_GET['id'])){
        dibujarTablero($filas, $cols, $_GET['id']);
    }else{
        dibujarTablero();
    }
    


    ?>
</body>

</html>