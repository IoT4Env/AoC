#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// ALWAYS DEFINE ARRAY SIZE AS A FACTOR OF 2^N
int column1[1024];
int column2[1024];

int totalRows = 1000;

int readColumnsFromFile(char *);
void sortAscending(int *);
unsigned long totalDifference(int *, int *);

int main(int argc, char **argv)
{
    if (readColumnsFromFile("input1.txt") == -1)
        return -1;

    // Sorting columns
    sortAscending(column1);
    sortAscending(column2);

    unsigned long totalSum = totalDifference(column1, column2);
    // Long unsigned format
    printf("%lu\n", totalSum);

    return 0;
}

unsigned long totalDifference(int *column1, int *column2)
{
    unsigned long sum = 0;

    for (int i = 0; i < totalRows; i++)
    {
        int difference = column1[i] - column2[i];

        if (difference < 0)
            difference *= -1;

        sum += difference;
    }
    return sum;
}

// Populates the second argument with the ordered list
void sortAscending(int array[])
{
    // Implementing a custom bubble sort alg.
    int i = 0;
    while (i < totalRows - 1)
    {
        int currentIndex = i;
        while (array[currentIndex] > array[currentIndex + 1])
        {
            int numberBku = array[currentIndex];
            array[currentIndex] = array[currentIndex + 1];
            array[currentIndex + 1] = numberBku;

            currentIndex--;
            i = -1;
        }
        i++;
    }
}

int readColumnsFromFile(char *file_name)
{
    // Preparing variables for reading the file
    char string[10];
    char ch;

    // Opening file in reading mode
    FILE *fptr = fopen(file_name, "r");

    if (fptr == NULL)
    {
        perror("Error opening the provided file");
        return -1;
    }

    // 'b' identifyes a variable with boolean purpouse
    int bIsFirstSpace = 0,
        index = 0,
        rowIndex = 0;

    // Reading file character by character
    // The following code works ONLY BECAUSE all numbers in the input file have the same length.
    while ((ch = fgetc(fptr)) != EOF)
    {
        // if(rowIndex >= 1000) break;
        if (ch == 0x20 && !bIsFirstSpace) // 0x20 => Space character
        {
            bIsFirstSpace = 1;
            column1[rowIndex] = atoi(string); // Append number to first column
            index = 0;
        }
        else if (ch == 0x20)
            continue;

        else if (ch == 0xA) // New line character
        {
            bIsFirstSpace = 0;
            column2[rowIndex] = atoi(string); // Append number to second column
            index = 0;
            rowIndex++; // After new line, increment the index for inserting numbers in column
        }
        else
        {
            string[index] = ch;
            bIsFirstSpace = 0;
            index++;
        }
    }

    // Closing the file
    if (fclose(fptr) == -1) // Handle error on closing file
        printf("File closing error");
    return 0;
}
