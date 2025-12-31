--Create table for storing total input rows
CREATE TABLE IF NOT EXISTS INPUT_DAY1 (
    ID INTEGER PRIMARY KEY,
    Input NVARCHAR NOT NULL
);

--Create table for storing input rows count
CREATE TABLE IF NOT EXISTS ROW_COUNT (
    Count INT NOT NULL
);

DELETE FROM INPUT_DAY1;

--Replace <puzzle_input> with your puzzle input
INSERT INTO INPUT_DAY1 (
    Input
) VALUES (
    '<puzzle_input>'
);


--Get puzzle input row count
WITH
    CTE (Iteration, RowCount) AS (
        SELECT 
            1,
            0
        
        UNION ALL

        SELECT 
            Iteration + 1,
            CASE
                WHEN SUBSTRING(INPUT_DAY1.Input, Iteration + 1, 1) = CHAR(10) THEN
                    RowCount + 1
                ELSE RowCount
            END 
        FROM CTE, INPUT_DAY1
        WHERE Iteration < LENGTH(INPUT_DAY1.Input)
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
