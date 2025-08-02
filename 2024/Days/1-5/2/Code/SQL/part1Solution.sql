BEGIN;
    --Declare in-memory tables
    PRAGMA temp_store = 2;
    
    --ROWS_INPUT_DAY2
    --L'idea è di applicare una ricorsion WITH per ogni riga della tabella ROWS_INPUT_DAY2
    --Vedi se riesci a fare una ricorsione per una riga (stringa) della tabella e se prende le irghe successive per ogni iterazione.
    
    --Below query can used as a with ending condition when the end of the string has been reached
    -- SELECT CAST(SUBSTRING(ROWS_INPUT_DAY2.row_data, 100, INSTR(ROWS_INPUT_DAY2.row_data, ' ')) AS INT) FROM ROWS_INPUT_DAY2 LIMIT 6;


    SELECT ROWS_INPUT_DAY2.row_data FROM ROWS_INPUT_DAY2 LIMIT 1;

    WITH SplitSting AS
    (
        SELECT
            RowID,
            SUBSTRING(ROWS_INPUT_DAY2.row_data, 1, INSTR(ROWS_INPUT_DAY2.row_data, ' ') - 1) AS part,
            SUBSTRING(ROWS_INPUT_DAY2.row_data, INSTR(ROWS_INPUT_DAY2.row_data, ' ')+1) AS remainder
        FROM ROWS_INPUT_DAY2
        WHERE INSTR(ROWS_INPUT_DAY2.row_data, ' ') > 0

        UNION ALL

        SELECT
            RowID,
            SUBSTRING(remainder, 1, INSTR(remainder, ' ') - 1),
            SUBSTRING(remainder, INSTR(remainder, ' ') + 1)
        FROM SplitSting
        WHERE remainder IS NOT NULL AND INSTR(remainder, ' ') > 0
    )
    SELECT * FROM SplitSting ORDER BY RowID LIMIT 10;
    -- SELECT * FROM (SELECT ROWS_INPUT_DAY2.row_data FROM ROWS_INPUT_DAY2) RID2 LIMIT 4;
    -- WITH CTE(iteration, current_row_data, previus_value_length) AS (
    --     SELECT 
    --         1,
    --         -- RID2.row_data,
    --         SUBSTRING(RID2.row_data, 0, INSTR(RID2.row_data, ' ')),
    --         0
    --     FROM (SELECT ROWS_INPUT_DAY2.row_data FROM ROWS_INPUT_DAY2) RID2

    --     UNION ALL

    --     SELECT 
    --         iteration + 1,
    --         -- RID2.row_data,
    --         SUBSTRING(RID2.row_data, previus_value_length + LENGTH(current_row_data), INSTR(RID2.row_data, ' ')),
    --         previus_value_length + LENGTH(current_row_data)
    --     FROM CTE, (SELECT ROWS_INPUT_DAY2.row_data FROM ROWS_INPUT_DAY2) RID2
    --     WHERE iteration < 100 --current_row_data = 0
    -- )
    -- SELECT * FROM CTE LIMIT 1;




    -- SELECT(
    -- WITH CTE(iteration, current_row_data, previus_value_length) AS (
    --     SELECT 
    --         1, 
    --         SUBSTRING(ROWS_INPUT_DAY2.row_data, 0, INSTR(ROWS_INPUT_DAY2.row_data, ' ')),
    --         0
    --     FROM ROWS_INPUT_DAY2

    --     UNION ALL

    --     SELECT 
    --         iteration + 1,
    --         SUBSTRING(ROWS_INPUT_DAY2.row_data, previus_value_length + LENGTH(current_row_data), INSTR(ROWS_INPUT_DAY2.row_data, ' ')),
    --         previus_value_length + LENGTH(row_data)
    --     FROM CTE, ROWS_INPUT_DAY2, ROW_COUNT
    --     WHERE iteration < ROW_COUNT.Count
    -- )
    -- SELECT current_row_data FROM CTE LIMIT 7;
    -- FROM ROWS_INPUT_DAY2;

    -- SELECT
    --     COUNT(*)
    -- FROM
    --     (WITH CTE(iteration, row_data) AS (
    --         SELECT 1, ROWS_INPUT_DAY2.row_data

    --         UNION ALL

    --         SELECT 
    --             iteration + 1,
    --             ROWS_INPUT_DAY2.row_data
            
    --         FROM CTE, ROWS_INPUT_DAY2, ROW_COUNT
    --         WHERE iteration < ROW_COUNT.Count
    --     )
    --     SELECT row_data FROM CTE
    -- );

END;