# SQL solution

## Premise
A fex things before the instructions on how to execute sql solution for AoC day1:
- Tables with prefix '_' are temporary tables;
- This solution requires sqlite3 installed.
    Verify the installation with this [command](#check-version)
    sqlite3 version 3.8.3 or higher is required for CTE support.

After checking all the above, you are ready to go:

## Instructions

1. Create a .db file inside the "SQL" folder like ```<db_file_name>.db```

2. Edit the ```createData.sql``` file and paste the puzzle input between the single quotes

3. [Execute](#execute-query-inside-the-database) the ```createData.sql``` query.

4. [Execute](#execute-query-inside-the-database) the ```part1Solution.sql``` query.

## sqlite3 commands

### Check version
```sh
$ sqlite3 --version
```

### Connect to lcoal .db file
```sh
$ sqlite3 <file_name>.db
sqlite>
```

### Execute query from outside the database
```sh
$ sqlite3 <file_name>.db < part1Solution.sql
```

### Quit sqlite3 session
```sh
sqlite> .quit
$ 
```

