<?php
    require_once("header.php");
    //devuelve si ha habido una modificación en la fila de dicho artículo
    if(isset($_GET['id']) && isset($_GET['cantidad'])){
        $id = intval($_GET['id']);
        $cantidad = intval($_GET['cantidad']);
        $respuesta = DB::actualizarArticulo($id, $cantidad);
        echo '{"filas_actualizadas": "'.$respuesta.'"}';
    }

    //devolver un artículo único mediante su id
    if(isset($_GET['id'])){
        $id = intval($_GET['id']);
        $articulo = json_encode(DB::devolverArticulo($id)) ;
        require_once("../Vista/vistaArticuloUnico.php");
    }

    //devuelve el número de articulos en base al nombre de la categoria que se le pase
    if(isset($_GET['categorias'])){
        $cantidadArticulos = DB::cantidadArticulos($_GET['categorias']);
        require_once("../Vista/vistaCantidadArticulos.php");
    }

    //devuelve un json con el nombre de cada una de las categorias
    if(isset($_GET['nombres_categorias'])){
        $listaDeCategorias = DB::devolverCategorias();
        require_once("../Vista/vistaCategorias.php");
    }

    //muestra los productos relacionados con la categoria, pagina actual y numero de productos que queremos en dicha página
    if(isset($_GET['listar'])){
        $pagActual=1; $tamPag=10; $categoria="todos";
        if(isset($_GET['pag'])){
            $pagActual = intval($_GET['pag']);
        }
        if(isset($_GET['tamPag'])){
            $tamPag = intval($_GET['tamPag']);
        }
    
        if(isset($_GET['categoria'])){
            $categoria = $_GET['categoria'];
        }
    
        $numTotalPags = ceil(DB::cantidadArticulos()/$tamPag);
        if($pagActual > $numTotalPags){
            $pagActual = $numTotalPags;
        }
    
        if($pagActual < 1){
            $pagActual = 1;
        }
    
        $listaDeArticulos = DB::listaArticulos($pagActual, $tamPag, $categoria);
        require_once("../Vista/vistaArticulos.php");
    }

    if(isset($_GET['random'])){
        $cantidadDeAleatorios = $_GET['random'];
        echo DB::listarArticulosAleatorios($cantidadDeAleatorios);
    }

   

    





?>