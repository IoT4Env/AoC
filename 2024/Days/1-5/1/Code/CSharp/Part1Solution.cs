class Part1
{
    public static int Solution(List<int> column1, List<int> column2)
    {
        //Sort in ascending order
        column1.Sort();
        column2.Sort();

        //Get total difference
        var difference = 0;
        for (int i = 0; i < column1.Count; i++)
            difference += Math.Abs(column1[i] - column2[i]);

        return difference;
    }
}
