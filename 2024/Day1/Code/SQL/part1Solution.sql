BEGIN;
    --Declare in-memory tables
    PRAGMA temp_store = 2;

    --Create table for storing total input rows
    CREATE TABLE IF NOT EXISTS _ROW_COUNT (
        Count VARCHAR(10) NOT NULL
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
    INSERT INTO _ROW_COUNT(
        Count
    ) VALUES (
        (SELECT 
            RowCount
        FROM CTE
        ORDER BY RowCount DESC
        LIMIT 1)
    );


    --Create temporary table-like data structure inside below temporary table
    WITH 
        _DATA_TABLE(Iteration, LeftCol, RightCol, DataRow) AS (
            SELECT 
                1,
                CAST(SUBSTRING(INPUT_DAY1.Input, 1, INSTR(INPUT_DAY1.Input, CHAR(10))) AS INT),
                CAST(SUBSTRING(INPUT_DAY1.Input, INSTR(INPUT_DAY1.Input, ' '), INSTR(INPUT_DAY1.Input, CHAR(10))) AS INT),
                SUBSTRING(INPUT_DAY1.Input, 1, INSTR(INPUT_DAY1.Input, CHAR(10)))
            FROM INPUT_DAY1

            UNION ALL

            SELECT
                Iteration + 1,
                CAST(SUBSTRING(INPUT_DAY1.Input, LENGTH(DataRow) * Iteration, INSTR(INPUT_DAY1.Input, CHAR(10))) AS INT),
                CAST(SUBSTRING(INPUT_DAY1.Input, LENGTH(DataRow) * Iteration + INSTR(INPUT_DAY1.Input, ' '), INSTR(INPUT_DAY1.Input, CHAR(10))) AS INT),
                SUBSTRING(INPUT_DAY1.Input, LENGTH(DataRow) * Iteration, INSTR(INPUT_DAY1.Input, CHAR(10)))
            FROM _DATA_TABLE, INPUT_DAY1, _ROW_COUNT
            WHERE Iteration < CAST(_ROW_COUNT.Count AS INT)
        )
        SELECT
            SUM(ABS(_RIGHT_ASC.Value - _LEFT_ASC.Value)) AS TotalDistance
        FROM (
            SELECT
                ROW_NUMBER() OVER (ORDER BY _DATA_TABLE.LeftCol) AS Row,
                _DATA_TABLE.LeftCol AS Value
            FROM _DATA_TABLE
        ) _LEFT_ASC
        INNER JOIN (
            SELECT
                ROW_NUMBER() OVER (ORDER BY _DATA_TABLE.RightCol) AS Row,
                _DATA_TABLE.RightCol AS Value
            FROM _DATA_TABLE
        ) _RIGHT_ASC
        ON _RIGHT_ASC.Row = _LEFT_ASC.Row;
            

    DROP TABLE IF EXISTS _ROW_COUNT;
END;
