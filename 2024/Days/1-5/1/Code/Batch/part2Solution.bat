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


set /A totalSimilarity=0
for %%a in (!column1!) do (

	for %%b in (!column2!) do (
		if %%a EQU %%b (
			set /A totalSimilarity=!totalSimilarity!+%%a
		)
	)
)

echo !totalSimilarity!

