    <style>

        label{
            display: inline-block;
            width: 160px;
        }
    </style>
    <?php
        if(isset($_SESSION['usuario']) && $_SESSION['usuario'] == 'admin'){
    ?>
            <form action="../Controlador/alta.php" method="post" enctype="multipart/form-data">
                <label for="nombre">Nombre:</label>
                <input type="text" name="nombre"><br>
                <label for="apellido1">apellido1:</label>
                <input type="text" name="apellido1"><br>
                <label for="apellido2">apellido2:</label>
                <input type="text" name="apellido2"><br>
                <label for="usuario">usuario:</label>
                <input type="text" name="usuario"><br>
                <label for="contrasenha">contrasenha:</label>
                <input type="password" name="contrasenha"><br>
                <label for="email">email:</label>
                <input type="email" name="email"><br>
                <button type="submit" name="submit" value="Enviar">Enviar</button>
            </form>
    <?php
        }else{
            header("Location: ../Vista/login.html");
        }
    ?>
