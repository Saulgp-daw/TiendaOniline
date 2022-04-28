<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	
		
	

	<?php
	if ($_GET){
	    
	
        $meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
		$num = $_GET["num"];
    	if($num){
    	    $mes = $meses[$num-1];
    	    echo "El mes es: " . $mes;
            
    	}else{
    	    echo "\nNo estoy dentro";
    	}
	}else{
	    ?>
	    
	    <form action="" method="GET" enctype="multipart/form-data">
		<label for="num_mes">Nº del mes: </label>
		<input type="text" name="num" id="num" maxlength="2" placeholder="Introduzca un número" size="4">
		<button type="submit">Enviar</button>
		</form>
		<?php 
	}
    		
	?>
</body>
</html>