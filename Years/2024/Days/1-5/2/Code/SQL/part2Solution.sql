BEGIN;
    --Declare in-memory tables
    PRAGMA temp_store = 2;

    -- Steps to solve this problem in SQL:
	-- STEP 1
	-- We need to evaluate all combinations that a line can have.
	-- Take this report as an example:
	-- 10 12 13 15 17
	--
	-- All possible combinations would be:
	-- 12 13 15 17
	-- 10 13 15 17
	-- 10 12 15 17
	-- 10 12 13 17
	-- 10 12 13 15
	--
	-- All these combinations should be inserted in a single table.
	-- WARNING:
	-- AN EXTRA TABLE TABLE SHOULD CONTAIN THE ACTUAL NUMBER OF THE REPORT BEING SPLITTED + THE ID OF THE TRUNCATED REPORT VERSION!!!
	-- So above example becomes:
	-- 1 | 0 | 12 13 15 17
	-- 1 | 1 | 10 13 15 17
	-- 1 | 2 | 10 12 15 17
	-- 1 | 3 | 10 12 13 17
	-- 1 | 4 | 10 12 13 15
	

	-- Declare table for containing reports with a missing level in them
	CREATE TABLE IF NOT EXISTS _REPORTS_TRUNCATED (
		id INTEGER PRIMARY KEY,
		report_id INTEGER NOT NULL,-- Referencing the RowId of ROWS_INPUT_DAY2
		truncated_report_id INTEGER NOT NULL, -- The id of a truncated version of the original report
		report NVARCHAR NOT NULL
	);

	-- Iterate over ROWS_INPUT_DAY2 and remove a level from report 
	WITH _SPLIT_REPORTS(RowId, iteration, full_report, report_truncated, remainder_left, part, remainder_right) AS (
		SELECT
			RowId AS RowId,
			0 AS iteration,
			ROWS_INPUT_DAY2.row_data AS full_report,
			SUBSTRING(ROWS_INPUT_DAY2.row_data, INSTR(ROWS_INPUT_DAY2.row_data, ' ') + 1) AS report_truncated,
			'' AS remainder_left,
			SUBSTRING(ROWS_INPUT_DAY2.row_data, 1, INSTR(ROWS_INPUT_DAY2.row_data, ' ') - 1) AS part,
            SUBSTRING(ROWS_INPUT_DAY2.row_data, INSTR(ROWS_INPUT_DAY2.row_data, ' ') + 1) AS remainder_right
		FROM ROWS_INPUT_DAY2

		UNION ALL

		-- Obtain chars to the left of level to remove
		-- Obtain chars to the right of level to remove
		-- Concat them and that is the report without an intermediant level
		SELECT
			RowId,
			iteration + 1,
			full_report,
			CASE
				WHEN remainder_left = '' THEN
					CONCAT(SUBSTRING(full_report, 1, LENGTH(part) + 1), SUBSTRING(full_report, LENGTH(part) + LENGTH(SUBSTRING(remainder_right, 1, INSTR(remainder_right, ' ') + 1)) + 1, LENGTH(full_report)))
				ELSE
					CONCAT(SUBSTRING(full_report, 1, LENGTH(remainder_left) + LENGTH(part) + 1), SUBSTRING(full_report, LENGTH(remainder_left) + LENGTH(part) + LENGTH(SUBSTRING(remainder_right, 1, INSTR(remainder_right, ' ') + 1)) + 1, LENGTH(full_report)))
			END,
			SUBSTRING(full_report, 1, LENGTH(remainder_left) + LENGTH(part) + 1),
			SUBSTRING(remainder_right, 1, INSTR(remainder_right, ' ') - 1),
            SUBSTRING(remainder_right, INSTR(remainder_right, ' ') + 1)
		FROM _SPLIT_REPORTS
        WHERE remainder_right IS NOT NULL AND INSTR(remainder_right, ' ') > 0

		UNION ALL

		SELECT
			RowId,
			iteration + 1,
			full_report,
			SUBSTRING(full_report, 1, LENGTH(remainder_left) + LENGTH(part)),
			remainder_left,
			remainder_right,
			NULL
		FROM _SPLIT_REPORTS
		WHERE remainder_right IS NOT NULL AND INSTR(remainder_right, ' ') = 0
	)
	INSERT INTO _REPORTS_TRUNCATED(report_id, truncated_report_id, report)
	SELECT 
		_SPLIT_REPORTS.RowId,
		_SPLIT_REPORTS.iteration,
		_SPLIT_REPORTS.report_truncated
	FROM _SPLIT_REPORTS;


	-- STEP 2
	-- Execute the logic you have defined for part 1 solution to all rows.
	-- The goal is to check if AT LEAST ONE modified report is SAFE.
	
	
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
            _REPORTS_TRUNCATED.report_id AS report_id,
			_REPORTS_TRUNCATED.truncated_report_id AS truncated_report_id,
            SUBSTRING(_REPORTS_TRUNCATED.report, 1, INSTR(_REPORTS_TRUNCATED.report, ' ') - 1) AS part,
            SUBSTRING(_REPORTS_TRUNCATED.report, INSTR(_REPORTS_TRUNCATED.report, ' ') + 1) AS remainder,
            0 AS is_safe
        FROM _REPORTS_TRUNCATED
        WHERE INSTR(_REPORTS_TRUNCATED.report, ' ') > 0

        UNION ALL

        SELECT
            report_id,
			truncated_report_id,
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
            report_id,
			truncated_report_id,
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
	-- Below select is different from part 1 solution
	-- It finds all reports that have at least a truncated version where all reports are safe
	-- It filters them by distincted report_id, valid_report and sums them together
	-- The same is done for _DESCENDING table
	SELECT SUM(valid_report)
	FROM (
		SELECT DISTINCT
			report_id,
			SUM(COUNT(is_safe) = COUNT(truncated_report_id)) OVER (PARTITION BY report_id, truncated_report_id) AS valid_report
		FROM _SPLIT_STRING
		GROUP BY report_id, truncated_report_id
		ORDER BY report_id
	) AS distinct_reports;


	--Iterate data checking for decresing values
    WITH _SPLIT_STRING AS
    (
        SELECT
            _REPORTS_TRUNCATED.report_id AS report_id,
			_REPORTS_TRUNCATED.truncated_report_id AS truncated_report_id,
            SUBSTRING(_REPORTS_TRUNCATED.report, 1, INSTR(_REPORTS_TRUNCATED.report, ' ') - 1) AS part,
            SUBSTRING(_REPORTS_TRUNCATED.report, INSTR(_REPORTS_TRUNCATED.report, ' ') + 1) AS remainder,
            0 AS is_safe
        FROM _REPORTS_TRUNCATED
        WHERE INSTR(_REPORTS_TRUNCATED.report, ' ') > 0

        UNION ALL

        SELECT
            report_id,
			truncated_report_id,
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
            report_id,
			truncated_report_id,
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
	SELECT SUM(valid_report)
	FROM (
		SELECT DISTINCT
			report_id,
			SUM(COUNT(is_safe) = COUNT(truncated_report_id)) OVER (PARTITION BY report_id, truncated_report_id) AS valid_report

		FROM _SPLIT_STRING
		GROUP BY report_id, truncated_report_id
		ORDER BY report_id
	) AS distinct_reports;


	--And the result is...
	-- This was tough...
    SELECT 
        _ASCENDING.Value + _DESCENDING.Value
    FROM _ASCENDING, _DESCENDING;


	--Drop temporary tables
    DROP TABLE IF EXISTS _ASCENDING;
    DROP TABLE IF EXISTS _DESCENDING;

	DROP TABLE IF EXISTS _REPORTS_TRUNCATED;

END;

