<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
</head>
<body>
	<table>
    	<?php
    	   $numero = 8;
    	   for($i=1;$i<=10;$i++){
    	       echo "<tr>";
    	       echo "<td> $numero </td><td>*</td><td> $i</td><td> = </td><td>",$numero*$i,"</td>";
    	       echo "</tr>";
    	       
    	   }
    	?>
	</table>
</body>
</html>


