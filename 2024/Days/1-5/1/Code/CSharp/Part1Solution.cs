class Part1
{
    public static int Solution(List<int> column1, List<int> column2)
    {
        //Sort in ascending order
        column1.Sort();
        column2.Sort();

        //Get total difference
        return column1.Zip(column2, (value1, value2) => Math.Abs(value1 - value2)).Sum();
    }
}
