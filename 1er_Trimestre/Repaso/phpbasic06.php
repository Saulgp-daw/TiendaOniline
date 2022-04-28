<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP basic 06 current file name</title>
</head>

<body>
    <?php
    $current_file_name = basename($_SERVER['PHP_SELF']);
    echo $current_file_name . "\n";

    ?>
</body>

</html>