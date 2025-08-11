<?php

$input1 = file_get_contents("input1.txt");

$lines = explode("\n", $input1);
while($lines[sizeof($lines) - 1] == ""){
    //Remove all empty strings found starting from the end of the array.
    array_pop($lines);
}

$column1 = [];
$column2 = [];
for($i = 0; $i < sizeof($lines); $i++){
    //Separate each line by space.
    $fields = explode(' ', $lines[$i]);

    //Since we do not know how many spaces between each value, we take the first and last element.
    $value1 = $fields[0];
    $value2 = $fields[sizeof($fields) - 1];
    
    array_push($column1, intval($value1));
    array_push($column2, intval($value2));
}

$sum = 0;
for ($i=0; $i < sizeof($column1); $i++) { 
    for ($j=0; $j < sizeof($column2); $j++) { 
        if($column1[$i] == $column2[$j]){
            $sum += $column1[$i];
        }
    }
}

echo $sum . "\n";

?>