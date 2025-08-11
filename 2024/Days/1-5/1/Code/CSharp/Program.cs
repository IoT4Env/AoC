//Read file in the main Program file
using var readtext = new StreamReader("input1.txt");

List<int> column1 = [];
List<int> column2 = [];
string? line = readtext.ReadLine();

while (line is not null)
{
    if (line.Equals(""))
    {
        line = readtext.ReadLine();
        continue;
    }

    //Spreading filtered values in an array just like Python
    //AMAZING!!!
    string[] values = [.. line.Split(' ').Where(l => !l.Equals(""))];
    column1.Add(Convert.ToInt32(values[0]));
    column2.Add(Convert.ToInt32(values[^1]));

    line = readtext.ReadLine();
}

readtext.Close();


// var difference = Part1.Solution(column1, column2);
// Console.WriteLine(difference);

var similarity = Part2.Solution(column1, column2);
Console.WriteLine(similarity);

//Call proper methods from other files

