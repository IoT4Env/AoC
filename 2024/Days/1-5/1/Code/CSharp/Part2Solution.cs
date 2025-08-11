class Part2
{
    public static int Solution(List<int> column1, List<int> column2)
    {
        //Get total difference
        var similarity = 0;
        for (int i = 0; i < column1.Count; i++)
        {
            for (int j = 0; j < column1.Count; j++)
            {
                if (column1[i] == column2[j])
                {
                    similarity += column1[i];
                }
            }
        }

        return similarity;
    }
}
