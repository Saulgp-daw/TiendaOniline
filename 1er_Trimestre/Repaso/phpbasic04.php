<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP basic 04</title>
</head>

<body>
    <?php
    if ($_POST) {
        $name = $_POST['name'];
        echo "Your name is: $name";
    } else {
    ?>
        <form action="" method="post" enctype="multipart/form-data">
            <h5>Please input your name: </h5>
            <input type="text" name="name" id="">
            <button type="submit">Send your name</button>
        </form>
    <?php
    }
    ?>

</body>

</html>