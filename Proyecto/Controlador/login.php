<?php
    include_once("header.php");

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    if(isset($postdata) && !empty($postdata)){
        $email = trim($request->email);
        $contrasenha = trim($request->contrasenha);
        
        echo DB::loginUsuario($email, $contrasenha);
    }
?>