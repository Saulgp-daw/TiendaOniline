<table>

<?php
$numero = $_POST["numero"];
for($i=1;$i<=10;$i++){
    echo "<tr>";
    echo "<td> $numero </td><td>*</td><td> $i</td><td> = </td><td>",$numero*$i,"</td>";
    echo "</tr>";
    
}
?>
</table>