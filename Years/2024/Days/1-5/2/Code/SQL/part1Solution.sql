BEGIN;
    --Declare in-memory tables
    PRAGMA temp_store = 2;

    --Declare tables for storing temporary alues to be used later as if they were variables
    CREATE TABLE IF NOT EXISTS _ASCENDING(
        value INT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS _DESCENDING(
        value INT NOT NULL
    );

    --Iterate data checking for increasing values
    WITH _SPLIT_STRING AS
    (
        SELECT
            RowId,
            SUBSTRING(ROWS_INPUT_DAY2.row_data, 1, INSTR(ROWS_INPUT_DAY2.row_data, ' ') - 1) AS part,
            SUBSTRING(ROWS_INPUT_DAY2.row_data, INSTR(ROWS_INPUT_DAY2.row_data, ' ') + 1) AS remainder,
            1 AS is_safe
        FROM ROWS_INPUT_DAY2
        WHERE INSTR(ROWS_INPUT_DAY2.row_data, ' ') > 0

        UNION ALL

        SELECT
            RowId,
            SUBSTRING(remainder, 1, INSTR(remainder, ' ') - 1),
            SUBSTRING(remainder, INSTR(remainder, ' ') + 1),
            CASE
                WHEN CAST(SUBSTRING(remainder, 1, INSTR(remainder, ' ') - 1) AS INT) > CAST(part AS INT)
                    AND ABS(CAST(SUBSTRING(remainder, 1, INSTR(remainder, ' ') - 1) AS INT) - CAST(part AS INT)) < 4 THEN 1
            END
        FROM _SPLIT_STRING
        WHERE remainder IS NOT NULL AND INSTR(remainder, ' ') > 0

        UNION ALL

        --Select the last element after the separator
        SELECT
            RowID,
            remainder,
            NULL,
            CASE
                WHEN CAST(remainder AS INT) > CAST(part AS INT)
                    AND ABS(CAST(remainder AS INT) - CAST(part AS INT)) < 4 THEN 1
            END
        FROM _SPLIT_STRING
        WHERE remainder IS NOT NULL AND INSTR(remainder, ' ') = 0
    
    )
    INSERT INTO _ASCENDING (value)
    SELECT
        SUM(COUNT(is_safe) = COUNT(RowID)) OVER ()
    FROM _SPLIT_STRING 
    GROUP BY RowId 
    ORDER BY RowId
    LIMIT 1;

    --Iterate data checking for decreasing values
    WITH _SPLIT_STRING AS
    (
        SELECT
            RowId,
            SUBSTRING(ROWS_INPUT_DAY2.row_data, 1, INSTR(ROWS_INPUT_DAY2.row_data, ' ') - 1) AS part,
            SUBSTRING(ROWS_INPUT_DAY2.row_data, INSTR(ROWS_INPUT_DAY2.row_data, ' ') + 1) AS remainder,
            1 AS is_safe
        FROM ROWS_INPUT_DAY2
        WHERE INSTR(ROWS_INPUT_DAY2.row_data, ' ') > 0

        UNION ALL

        SELECT
            RowId,
            SUBSTRING(remainder, 1, INSTR(remainder, ' ') - 1),
            SUBSTRING(remainder, INSTR(remainder, ' ') + 1),
            CASE
                WHEN CAST(SUBSTRING(remainder, 1, INSTR(remainder, ' ') - 1) AS INT) < CAST(part AS INT)
                    AND ABS(CAST(SUBSTRING(remainder, 1, INSTR(remainder, ' ') - 1) AS INT) - CAST(part AS INT)) < 4 THEN 1
            END
        FROM _SPLIT_STRING
        WHERE remainder IS NOT NULL AND INSTR(remainder, ' ') > 0

        UNION ALL

        --Select the last element after the separator
        SELECT
            RowID,
            remainder,
            NULL,
            CASE
                WHEN CAST(remainder AS INT) < CAST(part AS INT)
                    AND ABS(CAST(remainder AS INT) - CAST(part AS INT)) < 4 THEN 1
            END
        FROM _SPLIT_STRING
        WHERE remainder IS NOT NULL AND INSTR(remainder, ' ') = 0
    
    )
    INSERT INTO _DESCENDING (value)
    SELECT
        SUM(COUNT(is_safe) = COUNT(RowID)) OVER ()
    FROM _SPLIT_STRING 
    GROUP BY RowId 
    ORDER BY RowId
    LIMIT 1;

    --And the result is...
    SELECT 
        _ASCENDING.Value + _DESCENDING.Value
    FROM _ASCENDING, _DESCENDING;

    --Drop temporary tables
    DROP TABLE IF EXISTS _ASCENDING;
    DROP TABLE IF EXISTS _DESCENDING;
    
END;
