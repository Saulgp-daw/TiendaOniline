<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
</head>
<body>
	<form action="" method="POST" enctype="multipart/form-data">
		<label for="fecha">Fecha: </label>
		<input type="text" name="dia" id="dia" maxlength="2" placeholder="DD" size="4">
		<select id="mes">
		<?php 
		  $anhoInicio = 1989;
		  $anhoFin = 2021;
		  $meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
		  for($i=0; $i < 12; $i++){
		      echo "<option value='$meses[$i]'>$meses[$i]</option>";
		  }
		?>
		</select>
		<select>
			<?php 
    			for($i=$anhoInicio; $i < $anhoFin; $i++){
    			    echo "<option value='$i'>$i</option>";
    			}
			
			?>
		</select>
		<button type="submit">Enviar</button>
	</form>
</body>
</html>
