--Make sure no previus tables is present
DROP TABLE IF EXISTS INPUT_DAY2;
DROP TABLE IF EXISTS ROW_COUNT;
DROP TABLE IF EXISTS ROWS_INPUT_DAY2;


--Create table for storing total input rows
CREATE TABLE INPUT_DAY2 (
    ID INTEGER PRIMARY KEY,
    Input NVARCHAR NOT NULL
);

--Create table for storing input rows count
CREATE TABLE ROW_COUNT (
    Count INT NOT NULL
);

CREATE TABLE ROWS_INPUT_DAY2 (
    ID INTEGER PRIMARY KEY,
    row_data NVARCHAR NOT NULL
);


--Replace <puzzle_input> with your puzzle input
INSERT INTO INPUT_DAY2 (
    Input
) VALUES (
    '<puzzle_input>'
);


--Get puzzle input row count
WITH
    CTE (Iteration, RowCount) AS (
        SELECT  1, 0
        
        UNION ALL

        SELECT 
            Iteration + 1,
            CASE
                WHEN SUBSTRING(INPUT_DAY2.Input, Iteration + 1, 1) = CHAR(10) THEN
                    RowCount + 1
                ELSE RowCount
            END 
        FROM CTE, INPUT_DAY2
        WHERE Iteration < LENGTH(INPUT_DAY2.Input)
    )
INSERT INTO ROW_COUNT(
    Count
) VALUES (
    (SELECT 
        RowCount
    FROM CTE
    --The biggest number is the current row ocunt of the initial input
    ORDER BY RowCount DESC
    LIMIT 1)
);

--Insert each puzzle input row inside a table
WITH
    _DATA_TABLE(iteration, previous_data_length, row_data) AS (
        SELECT 
            1,
            0,
            SUBSTRING(INPUT_DAY2.Input, 1, INSTR(INPUT_DAY2.Input, CHAR(10))-1)
        
        FROM INPUT_DAY2
        
        UNION ALL

        SELECT
            iteration + 1,
            previous_data_length + LENGTH(row_data) + 1,
            SUBSTRING(INPUT_DAY2.Input, LENGTH(row_data) + previous_data_length + 2, INSTR(SUBSTRING(INPUT_DAY2.Input, LENGTH(row_data) + previous_data_length + 2), CHAR(10))-1)
        
        FROM _DATA_TABLE, INPUT_DAY2, ROW_COUNT
        WHERE iteration < ROW_COUNT.Count
    )
    INSERT INTO ROWS_INPUT_DAY2(row_data)
    SELECT row_data FROM _DATA_TABLE;

--Clear redundant tables
DROP TABLE INPUT_DAY2;
