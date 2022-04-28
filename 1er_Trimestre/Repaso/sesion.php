<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sesión</title>
</head>

<body>
    <form action="" method="post">
        <input type="text" name="sesion">
        <input type="submit" value="Enviar">
    </form>
    <?php
    if ($_POST) {
        $_SESSION['sesion'] = $_POST['sesion'];
        if ($_SESSION['sesion']) {
            echo $_SESSION['sesion'];
        }
    }


    ?>
</body>

</html>