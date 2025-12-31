# Get columns from file
$column1 = @()
$column2 = @()
foreach($line in Get-Content "input1.txt") {
	if ($line -eq "") {
		continue
	}

	$splittedLine = $line -split " "

	# First element = first number
	$column1 += $splittedLine[0]

	# Second element = òast number (skipping empty value due to multiple spaces dividing input columns)
	$column2 += $splittedLine[-1]
}


# Get total similarity
$totalSimilarity = 0
foreach($el1 in $column1) {
	foreach($el2 in $column2) {
		if($el1 -eq $el2) {
			$totalSimilarity += $el1		
		}
	}
}


# Print total similarity
Write-Output $totalSimilarity
