(defun print-menu ()
	; Clears the screen
	(format t "~A[H~@*~A[J" #\escape)

	(println-no-repl "**********************************************")
	(println-no-repl "**** Lisp solution for Day 1 of AoC 2024 *****")
	(println-no-repl "**********************************************")

	(println-no-repl "Available solution(s)")
	(println-no-repl "-------------")
	(println-no-repl "| 1: Part1  |")
	(println-no-repl "| 2: Part2  |")
	(println-no-repl "| 0: Exit   |")
	(println-no-repl "-------------")

	(print-no-repl "Type the part number you want to execute: ")
)

(defun println-no-repl (s)
	(format t s) ; Remove quotes
	(terpri) ; Forces new line
	(values) ; removes the repl return value
)

(defun print-no-repl (s)
	(format t s) ; Remove quotes
	(values) ; removes the repl return value
)

(defun user-continue()
	(println-no-repl "")
	(print-no-repl "Press ENTER to continue...")
	(read-line)
	
	(lisp-solution)
)

(defun user-exit()
	(println-no-repl "Bye and happy holidays!!!")
)


(defun lisp-solution()
	(print-menu)

	(let ((user-input (parse-integer (read-line))))
		(case user-input
			((1) (progn
				(print-no-repl "Solution for day 1 part 1 is: ")
				
				; Previusly loaded functions found in other scripts are replaced with functions defined inside below script
				; This is presented with a bunch of warning on the console...
				(load "part1Solution.lisp")
				(user-continue))
			)
			((2) (progn
				(print-no-repl "Solution for day 1 part 2 is: ")
				
				; Previusly loaded functions found in other scripts are replaced with functions defined inside below script
				; This is presented with a bunch of warning on the console...
				(load "part2Solution.lisp")
				(user-continue))
			)
			((0) (user-exit))
			(otherwise (progn
				(println-no-repl "Invalid input")
				(user-continue))
			)
		)
	)
)


(defun solver-main ()
	(lisp-solution)
)


(solver-main)
