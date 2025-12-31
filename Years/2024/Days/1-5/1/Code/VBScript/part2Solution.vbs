on Error Resume Next
Dim row, splittedRow, index, maxInputFileRows


' Prepare file system ovject to read input file and save this part solution on another file
Set fso = CreateObject("Scripting.FileSystemObject")
Set input1File = fso.OpenTextFile("input1.txt", 1)



' By default, input file has 1000 entryes (index 999).
Dim column1(999)
Dim column2(999)

index = 0
Do Until input1File.AtEndOfStream
	if index > 999 then
		Exit Do
	End if
	
	row = input1File.ReadLine
	splittedRow = Split(row, " ")

	column1(index) = splittedRow(0)
	column2(index) = splittedRow(UBound(splittedRow))

	index = index + 1
Loop

input1File.Close


' Get total similarity between two columns
Dim totalSimilarity
totalSimilarity = 0
For i = 0 to 999 Step 1
	For j = 0 to 999 Step 1
		if column1(i) = column2(j) Then
			totalSimilarity = totalSimilarity + column1(i)
		End if
	Next
Next


' Save result on a temporary file
Set part1SolutionFile = fso.CreateTextFile("part2.tmp", True)
part1SolutionFile.Write totalSimilarity


part1SolutionFile.Close
