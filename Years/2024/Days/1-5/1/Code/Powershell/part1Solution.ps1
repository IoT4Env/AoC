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


# Sort columns in ascending order
$column1 = Write-Output $column1 | Sort-Object
$column2 = Write-Output $column2 | Sort-Object


# Get total difference
$totalDifference = 0
$index = 0
foreach($el in $column1) {
	$totalDifference += [math]::Abs($el - $column2[$index])
	$index += 1
}


# Show total difference
Write-Output $totalDifference


