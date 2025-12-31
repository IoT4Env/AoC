; Read input txt file (plus assert to close the file)
(defun read-file (file-name)
	(with-open-file (stream file-name :direction :input)
		; Read file line by line
		(loop for line = (read-line stream nil)
			; Return the data as a list of list of integers
			; 'Do' statement acceps as many instructions as needed (for a single iteration)
			while (and line (not(= 0 (length line))))
			collect (loop for (integer position) := (multiple-value-list
				(parse-integer line :start (or position 0) :junk-allowed t))
					while integer
					collect integer
			)
		)
	)
)

; main
(defun main()
	(let ((data-chunks (read-file "input1.txt")))
		; We can define multiple variables in a single line!
		(let ((column1 (get-column data-chunks 0)) (column2 (get-column data-chunks 1)))

			; Sort each column in ascending order
			(sort column1 '<)
			(sort column2 '<)

			; Get total difference
			(format t "~A" (get-total-difference column1 column2))
		)
	)
)

; Retrieves column from the given data matrix
; Format of the data argument is a N X 2 array
; ((12345 54321) (34215 51243) ...)
(defun get-column (data col-index)
	(loop for i from 0 to (- (length data) 1)
		collect (nth col-index (nth i data))
	)
)

(defun get-total-difference (column1 column2)
	(let ((result (loop for i from 0 to (- (length column1) 1)
			collect (abs (- (nth i column1) (nth i column2)))
		)))
		
		(sum-list result)
	)
)

(defun sum-list (numbers)
	(if (null numbers) 
		0 
		(+ (first numbers) (sum-list (rest numbers)))
	)

)

(main)
