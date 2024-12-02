BEGIN;
    PRAGMA temp_store = 2;

    CREATE TABLE IF NOT EXISTS _TEMP1 (
        Col1 VARCHAR(10) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS _TEMP2 (
        Col1 INT NOT NULL,
        Col2 INT NOT NULL
    );

    WITH
        CTE (x, y) AS (
            SELECT 
                1,
                0
            
            UNION ALL

            SELECT 
                x + 1,
                CASE
                    WHEN SUBSTRING(INPUT_DAY1.Input, x + 1, 1) = CHAR(10) THEN
                        y + 1
                    ELSE y
                END 
            FROM CTE, INPUT_DAY1
            WHERE x < LENGTH(INPUT_DAY1.Input)
        )
    INSERT INTO _TEMP1(
        Col1
    ) VALUES (
        (SELECT 
            y
        FROM CTE
        ORDER BY Y DESC
        LIMIT 1)
    );

    WITH
        CTE(x, y) AS (
            SELECT
                1,
                SUBSTRING(INPUT_DAY1.Input, 1, INSTR(INPUT_DAY1.Input, CHAR(10)) - 1)
            FROM INPUT_DAY1

            UNION ALL

            SELECT
                x + 1,
                SUBSTRING(INPUT_DAY1.Input, LENGTH(y) * x, INSTR(INPUT_DAY1.Input, CHAR(10)))
            FROM INPUT_DAY1, CTE, _TEMP1
            WHERE x < (SELECT 
                    CAST(_TEMP1.Col1 AS INT)
                FROM _TEMP1)
        )
    INSERT INTO _TEMP2(
        Col1, Col2
    ) VALUES(
        (SELECT
            CAST(y AS INT)
        FROM CTE),
        (SELECT
            CAST(SUBSTRING(y, LENGTH(SUBSTRING(y, 0, INSTR(y, ' '))) + 4, LENGTH(y)) AS INT)
        FROM CTE)
    );

    SELECT 
        *
    FROM _TEMP2;
    -- SELECT
    --     CAST(y AS INT),
    --     CAST(SUBSTRING(y, LENGTH(SUBSTRING(y, 0, INSTR(y, ' '))) + 4, LENGTH(y)) AS INT)
    -- FROM CTE;

    DROP TABLE IF EXISTS _TEMP1;
    DROP TABLE IF EXISTS _TEMP2;
END;


-- WITH
--     CTE (x, y) AS (
--         SELECT 
--             1,
--             0
        
--         UNION ALL

--         SELECT 
--             x + 1,
--             CASE
--                 WHEN SUBSTRING(INPUT_DAY1.Input, x + 1, 1) = CHAR(10) THEN
--                     y + 1
--                 ELSE y
--             END 
--         FROM CTE, INPUT_DAY1
--         WHERE x < LENGTH(INPUT_DAY1.Input)
--     )
-- SELECT 
--     y
-- FROM CTE
-- ORDER BY Y DESC
-- LIMIT 1

-- WITH
--     CTE(x, y) AS (
--         SELECT
--             1,
--             SUBSTRING(INPUT_DAY1.Input, 1, INSTR(INPUT_DAY1.Input, CHAR(10)) - 1)
--         FROM INPUT_DAY1

--         UNION ALL

--         SELECT
--             x + 1,
--             SUBSTRING(INPUT_DAY1.Input, LENGTH(y) * x, INSTR(INPUT_DAY1.Input, CHAR(10)))
--         FROM INPUT_DAY1, CTE
--         WHERE x < 25
--     )
-- SELECT --DISTINCT
--     y
-- FROM CTE;

-- SELECT
--     --SUBSTRING(INPUT_DAY1.Input, 1, INSTR(INPUT_DAY1.Input, CHAR(10)) - 1) AS Col1,
--     SUBSTRING(INPUT_DAY1.Input, 1, LENGTH(INPUT_DAY1.Input) - INSTR(INPUT_DAY1.Input, CHAR(10)))
-- FROM INPUT_DAY1


-- SELECT
--     SUBSTRING(INPUT_DAY1.Input, 1, INSTR(INPUT_DAY1.Input, CHAR(10)) - 1) AS Col1,
--     SUBSTRING(INPUT_DAY1.Input, INSTR(INPUT_DAY1.Input, CHAR(10)), INSTR(INPUT_DAY1.Input, CHAR(10))) AS Col2
-- FROM INPUT_DAY1



-- WITH
--     CTE(x, y) AS (
--         SELECT
--             1,
--             SUBSTRING(INPUT_DAY1.Input, 0, 1)
--         FROM INPUT_DAY1

--         UNION ALL

--         SELECT
--             x + 1,
--             SUBSTRING(INPUT_DAY1.Input, x + 1, 1)
--             -- CASE
--             --     WHEN SUBSTRING(INPUT_DAY1.Input, x + 1, 1) = CHAR(10) THEN
--             --         y + 1
--             -- END
--         FROM INPUT_DAY1, CTE
--         WHERE x < 100
--     )
-- SELECT --DISTINCT
--     y
-- FROM CTE;
