<?php session_start(); ?>
<!doctype html>
<html lang='en'>

<head>
    <title>Index</title>
    <!-- Required meta tags -->
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>

    <!-- Bootstrap CSS v5.0.2 -->
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC' crossorigin='anonymous'>

</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <h3>Tienda On-Lina La Estilográfica</h3>
            </div>
            <div class="col">
                <form action="#" method="post">
                    <span><button type="button">Cerrar Sesión</button></span>
                    <input type="hidden" name="cerrarSesion" value="cerrarSesion">
                </form>
                
            </div>
        </div>
        <div class="row">
            <div class="col">
                <table class='table'>
                    <thead>
                        <tr>
                            <th>Productos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        require_once('../Producto.php');
                        require_once('../Carrito.php');
                        $plumas = [];
                        $pelikan = new Producto(1, 'Pelikan Souvëran M-1000', 'Preciosa pluma estilográfica de diamante', '545€', '../img/pelikan.png');
                        $parker = new Producto(2, 'Parker Duofold International', 'Preciosa pluma estilográfica de zafiro', '406€', '../img/parker.png');
                        $visconti = new Producto(3, 'Visconti Van Gogh', 'Preciosa pluma estilográfica de rubí', '180€', '../img/visconti.png');

                        array_push($plumas, $pelikan, $parker, $visconti);

                        foreach ($plumas as $objetoPluma) {
                            echo "
                    <tr>
                        <td>
                            <form action='#' method='post'>
                            <img src='{$objetoPluma->getImagen()}'><br>
                            <input type='hidden' name='{$objetoPluma->getNombre()}' value='{$objetoPluma->getImagen()}'>
                            <label for='nombre'>{$objetoPluma->getNombre()}</label><br>
                            <input type='hidden' name='{$objetoPluma->getId()}' value='{$objetoPluma->getNombre()}'>
                            <label for='precio'>Precio: {$objetoPluma->getPrecio()}</label><br>
                            <input type='hidden' name='{$objetoPluma->getPrecio()}' value='{$objetoPluma->getPrecio()}'>
                            <button type='submit' value='Comprar'>Comprar</button>
                            <button class='btn' type='button' value='{$objetoPluma->getDetalles()}'>Mostrar detalles</button>
                            </form>
                        </td>
                    </tr>";
                        }
                        ?>

                    </tbody>
                </table>
            </div>
            <?php
            if(isset($_POST['cerrarSesion'])){
                unset($_SESSION['carrito']);
                session_destroy();
            }
            if (isset($_SESSION['carrito'])) {
                $nuevoCarrito = $_SESSION['carrito'];
            } else {
                $nuevoCarrito = [];
                $_SESSION['carrito'] = $nuevoCarrito;
                $_SESSION['cantidadPelikan'] = 0;
                $_SESSION['cantidadParker'] = 0;
                $_SESSION['cantidadVisconti'] = 0;
            }
            if (isset($_POST[1]) &&  $_POST[1] == 'Pelikan Souvëran M-1000') {
                $_SESSION['imagenPelikan'] = "../img/pelikan.png";
                $_SESSION['nombrePelikan'] = $_POST[1];
                $_SESSION['precioPelikan'] = $_POST['545€'];
                $cantidadPelikan = $_SESSION['cantidadPelikan'];
                $cantidadPelikan += 1;
                $_SESSION['cantidadPelikan'] = $cantidadPelikan;
            } elseif (isset($_POST[2]) &&  $_POST[2] == 'Parker Duofold International') {
                $_SESSION['imagenParker'] = "../img/parker.png";
                $_SESSION['nombreParker'] = $_POST[2];
                $_SESSION['precioParker'] = $_POST['406€'];
                $cantidadParker = $_SESSION['cantidadParker'];
                $cantidadParker += 1;
                $_SESSION['cantidadParker'] = $cantidadParker;
            } elseif (isset($_POST[3]) &&  $_POST[3] == 'Visconti Van Gogh') {
                $_SESSION['imagenVisconti'] = "../img/visconti.png";
                $_SESSION['nombreVisconti'] = $_POST[3];
                $_SESSION['precioVisconti'] = $_POST['180€'];
                $cantidadVisconti = $_SESSION['cantidadVisconti'];
                $cantidadVisconti += 1;
                $_SESSION['cantidadVisconti'] = $cantidadVisconti;
            }
            unset($_POST[1]);
            unset($_POST[2]);
            unset($_POST[3]);
            unset($nuevoCarrito);
            $nuevoCarrito = [];
            if (isset($_SESSION['imagenPelikan'])) {
                $datosPelikan = array($_SESSION['imagenPelikan'], $_SESSION['nombrePelikan'], $_SESSION['precioPelikan'], $_SESSION['cantidadPelikan']);
                array_push($nuevoCarrito, $datosPelikan);
            }
            if (isset($_SESSION['imagenParker'])) {
                $datosParker = array($_SESSION['imagenParker'], $_SESSION['nombreParker'], $_SESSION['precioParker'], $_SESSION['cantidadParker']);
                array_push($nuevoCarrito, $datosParker);
            }
            if (isset($_SESSION['imagenVisconti'])) {
                $datosVisconti = array($_SESSION['imagenVisconti'], $_SESSION['nombreVisconti'], $_SESSION['precioVisconti'], $_SESSION['cantidadVisconti']);
                array_push($nuevoCarrito, $datosVisconti);
            }
            $_SESSION['carrito'] = $nuevoCarrito;
            
            ?>
            <div class="col">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Carrito</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        foreach ($_SESSION['carrito'] as $producto) {
                            echo "<tr>
                                        <td>
                                        <img src='". $producto[0] . "' style='width:200px'><br>
                                            <span>{$producto[1]}</span><br>
                                            <span>{$producto[2]}</span><br>
                                            <span>{$producto[3]}</span><br>
                                        </td>
                                </tr>";
                        }

                        ?>
                    </tbody>
                </table>
            </div>

        </div>
    </div>


    <!-- Bootstrap JavaScript Libraries -->
    <script src='https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js' integrity='sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p' crossorigin='anonymous'></script>
    <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js' integrity='sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF' crossorigin='anonymous'></script>
</body>

</html>