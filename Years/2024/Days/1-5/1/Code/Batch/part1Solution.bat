@echo off
setlocal enableDelayedExpansion



set "column1="
set "column2="

set /A indexer=-1

@REM Each token index match an alphabetical letter after the one defined in the for loop in incremental order
@REM Example: tokens1,2,3 => %%a, %%b, %%c
for /F "tokens=1,2" %%l in (input1.txt) do (
	set "column1=!column1!%%l "
	set "column2=!column2!%%m "

	set /A indexer=!indexer!+1
)


@REM Now, how in the world do we sort there numbers without sort.exe???...
set /A min=0

for /L %%e in (0,1,!indexer!) do (
	@REM This puzzle input does not contain 6 digit numbers, so the max number will never be greater than the max variable defined below.
	set /A max=100000

	@REM Get min number in list
	for %%a in (!column1!) do (
		if %%a LSS !max! (
			if %%a GTR !min! (
				set /A max=%%a
			)
		)
	)
	set /A min=!max!
	echo !min! >> journal1.tmp

	@REM FROM THE ACTUAL DOCUMENTATION
	@REM https://ss64.com/nt/syntax-replace.html
	@REM CALL SET "_result=%%_test:%_endbit%=%%"
	call set "column1=%%column1: !min!=%%"
)


@REM Sorting with duplicate numbers
set /A min=0

for /L %%e in (0,1,!indexer!) do (
	@REM This puzzle input does not contain 6 digit numbers, so the max number will never be greater than the max variable defined below.
	set /A max=100000

	@REM Get min number in list
	for %%a in (!column2!) do (
		if %%a LSS !max! (
			if %%a GEQ !min! (
				set /A max=%%a
			)
		)
	)
	set /A min=!max!
	echo !min! >> journal2.tmp

	@REM Remove only first occurence of min from column2
	call set "right=%%column2:*!min!=%%"

	if "!right!" EQU " " (
		set left=!column2:~0,-6!
		set "column2=!left!"
	) else (
		call set "left=%%column2:!right!=%%"
		set left=!left:~0,-6!

		set "column2=!left!!right!"
	)
)


@REM Read files and do needed operation to solve this problem
set /A totalDifference=0
set /A indexer=0
for /F %%a in (journal1.tmp) do (
	set /A indexer2=0

	for /F %%b in (journal2.tmp) do (
		if !indexer! EQU !indexer2! (
			set /A difference=%%a - %%b

			if !difference! LSS 0 (
				set /A difference=!difference!*-1
			)
		)

		set /A indexer2=!indexer2!+1
	)

	set /A totalDifference=!totalDifference!+!difference!

	set /A indexer=!indexer!+1
)

echo !totalDifference!


del journal*.tmp

