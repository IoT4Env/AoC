# AoC
Advent of Code problems to solve in various languages.


## Merry

![Christmas](2024/Christmas/Imgs/merryXMAS.png)

Reference from day 4 puzzle

## General instructions

The txt input file must be created inside the folder of the language to solve the puzzle from.
Except for the SQL case, as stated in the [SQL section](#sql).


## Legend (by date invented)

- [SQL (1970)](#sql)
- [C (1970)](#c)
- [C++ (1979)](#c-1)
- [Python (1991)](#python)
- [JavaScript (1995)](#javascript)
- [PHP (1995)](#php)
- [C# (2000)](#c-2)
- [Godot (January 14 2014)](#godot)


## SQL

A fex things before the instructions on how to execute sql solutions:
- Tables with prefix '_' are temporary tables;
- This solution requires sqlite3 installed.\
    Verify the installation with this [command](#check-version)\
    sqlite3 version 3.8.3 or higher is required for CTE support.

After checking all the above, you are ready to go:

### Instructions

1. Create a .db file inside the "SQL" folder like ```<db_file_name>.db```

2. Edit the ```createData.sql``` file and replace the ```<puzzle_input>``` string in single quotes.

3. [Execute](#execute-query-inside-the-database) the ```createData.sql``` query.

4. [Execute](#execute-query-inside-the-database) the ```part1Solution.sql``` query.

### Sqlite3 functions

### CTE

Basically a while loop...

Example:

```sql
--Param declaration
WITH CTE(iteration, count) AS (
    SELECT 1, 0--Setting initial param values
    --iteration = 1
    --count = 0

    UNION ALL--Body og the while loop

    SELECT iteration + 1,

        CASE--If statement
            WHEN SUBSTRING(INPUT_DAYX.Input, Iteration + 1, 1) = CHAR(10) THEN
                count + 1
            ELSE count
        END

    FROM CTE, INPUT_DAYX
    WHERE Iteration < LENGTH(INPUT_DAYX.Input)--Same condition inside the while loop

)
--So something with the result of the while iteration
SELECT 
    RowCount
FROM CTE
ORDER BY RowCount DESC
LIMIT 1;
```

```py
#Data inside the SQL table
input_dayx = "input_here"

#Param declaration in the CTE expression
iteration = 1
count = 0

#Code after the UNION ALL of the CTE.
while iteration < len(input_dayx):#The while condition is the same as the WHERE clause
    iteration += 1

    if "\n" in input_dayx:#Case statement
        count += 1
    else:
        count = count

#So something with the result of the while iteration
print(count)
```

### SUBSTRING

Syntax: SUBSTRING(string, start, length)

For a given string, it gets a substring of length {length} starting from index {start}.

### LENGTH

Syntax: LENGTH(string)

Returns the LENGTH of the passed string.

### INSTR

Syntax: INSTR(string, substring)

Searches for a substring within a string and returns the integer position of the first occurrence of that substring.

### sqlite3 commands

#### Check version
```sh
$ sqlite3 --version
```

#### Connect to lcoal .db file
```sh
$ sqlite3 <file_name>.db
sqlite>
```

#### Execute query from outside the database
```sh
$ sqlite3 <file_name>.db < part1Solution.sql
```

#### Quit sqlite3 session
```sh
sqlite> .quit
$ 
```


## C

Compilation and execution of the C solution was made in Linux.
To compile the C program solutions, navigate to the C directory of the desired day and use the following syntax:

```sh
gcc <solution>.c -o <solution>.o && ./<solution>.o
```

### Example

```sh
gcc part2Solution.c -o part2Solution.o && ./part2Solution.o
```

## C++

Refer to the [C Solution](#c-solution), but instead of the gcc compiler use the g++ one.


## Python

Navigate to the ```Python``` directory of the desired day and open a terminal.
Then type the following command:

```sh
python3 <file_name>.py
```

## JavaScript

Navigate to the ```JavaScript``` directory of the desired day and open a terminal.
Then type the following command:

```sh
node <file_name>.js
```

## PHP

Navigate to the ```Php``` directory of the desired day and open a terminal.
Then type the following command:

```sh
php -f <file_name>.php
```

## C#

Navigate to the ```CSharp``` directory of the desired day and open a terminal.
Then type the following command:

```sh
dotnet run
```

## Godot

Below procedures are made in Linux.
For more informations, check the [Official Godot Documentation](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html)
The official godot engine executable for Linux is needed for this solution.
When downloaded, open a terminal in the directory where the executable is located and type the following commands:

```sh
#Copy the godot executable in the local bin folder where for easy access from anywhere.
#Replace <Godot_engine_name_and_version> with actual godot executable name.
sudo cp <Godot_engine_name_and_version> /usr/local/bin

#Navigate to the local bin folder.
cd /usr/local/bin

#Rename the executable with 'godot' (case-sensitive).
sudo mv <Godot_engine_name_and_version> godot
```

### Godot script execution

Navigate to the Godot directory of the desired day and open a terminal, then type the following command:

```sh
godot -s <file_name>.gd
```

### Example

```sh
godot -s part1Solution.gd
```


