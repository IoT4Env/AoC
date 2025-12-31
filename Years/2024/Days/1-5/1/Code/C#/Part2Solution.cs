class Part2
{
    public static int Solution(List<int> column1, List<int> column2)
        => column1.Select(value => value * column2.Where(value2 => value == value2).Count()).Sum();
}
