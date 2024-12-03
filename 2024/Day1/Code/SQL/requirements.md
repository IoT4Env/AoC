# SQL solution

This solution requires sqlite3 installed in the PC.

Verify the installation with this [command](#check-version)
Any version of sqlite3 will do.

After checking all the above, you are ready to go:

1. Create a .db file inside the "SQL" folder like ```<db_file_name>.db```

2. Edit the ```createData.sql``` file and paste the puzzle input between the single quotes

3. [Execute](#execute-query-inside-the-database) the ```createData.sql``` query.

4. [Execute](#execute-query-inside-the-database) the ```part1Solution.sql``` query.

## sqlite3 commands

### Check version
> sqlite3 --version

### Connect to lcoal .db file
> sqlite3 <file_name>.db

### Execute query inside the database
> sqlite3 <file_name>.db < <query>.sql

### Quit sqlite3 session
> .quit

