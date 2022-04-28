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
    $lista = "";
    $num = 0;
    if ($_POST && isset($_POST["num"])) {
        $num = $_POST["num"];
        if ($num == -1) {
            $listaFinal = explode(" ", trim($_POST["lista"]));
            echo "<table border='1'>";
            $suma = 0;
            foreach ($listaFinal as $i => $valor) {
                echo "<tr><td>#", intval($i) + 1, "</td> <td>$valor</td></tr>";
                $suma += intval($valor);
            }
            echo "<tr><td>Suma</td><td> $suma </td></tr>";
            echo "</table>";
        } else {
            $lista = $_POST["lista"] . $num . " ";
            echo "[" . $lista . "]";
        }
    }
    if ($num != -1) {
    ?>
        <form action="" method="post" enctype="multipart/form-data">
            <label for="num">Introduzca un número</label><br>
            <input type="number" name="num" id="num" size="5">
            <input type="hidden" name="lista" id="lista" value='<?php echo $lista ?>'>
            <button type="submit">Enviar</button>
            <button type="reset">Reset</button>
        </form>

    <?php
    }


    ?>




</body>

</html>