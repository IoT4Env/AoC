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


' Sort columns 1 and 2 in ascending order
column1 = sort(column1)
column2 = sort(column2)


Function sort(column)
	Dim temp, index
	index = 0
	Do Until index > 998
		For i = 0 to 998 Step 1
			if column(i) > column(i + 1) then
				temp = column(i)
				column(i) = column(i + 1)
				column(i + 1) = temp

				index = 0
			End if

			index = index + 1
		Next
	Loop

	sort = column
End Function


' Get total difference between two columns
Dim totalDifference
totalDifference = 0
For i = 0 to 999 Step 1
	totalDifference = totalDifference + Abs(column1(i) - column2(i))
Next


' Save result on a temporary file
Set part1SolutionFile = fso.CreateTextFile("part1.tmp", True)
part1SolutionFile.Write totalDifference


part1SolutionFile.Close
