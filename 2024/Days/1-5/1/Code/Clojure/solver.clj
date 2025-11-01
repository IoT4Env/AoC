(defn solver-menu []
	(print (str (char 27) "[2J")) ;; Clears the screen
	(print (str (char 27) "[;H")) ;; Moves the cursor to the top left corner

	(println "**********************************************")
	(println "*** Clojure solution for Day 1 of AoC 2024 ***")
	(println "**********************************************")

	(println "\nAvailable solution(s)")
	(println "-------------")
	(println "| 1: Part1  |")
	(println "| 2: Part2  |")
	(println "| 0: Exit   |")
	(println "-------------")

	(print "Type the part number you want to execute: ")

	(flush) ;; Makes user input work
)


(defn clojure-solution []
	(solver-menu)
	(def user-input (read-string (read-line)))

	(case user-input
		1 (load-file "part1Solution.clj")
		2 (load-file "part2Solution.clj")
		0 (println "Exiting")
		(println "Invalid input")
	)

	(if (<= user-input 0) -1
		(if ( < user-input 3) 0 -1)
	)
)


(defn user-continue []
	(print "Do you want to execute another solution? (CASE-SENSITIVE) [y/n]: ")

	(flush) ;; Makes user input work
	(def continue (read-line))

	(if (= continue "y") 1 0)
)


(defn main []
	(loop [result (clojure-solution)]
		(when (>= result 0)
			;; Ask user for another try, else exit the application.
			(if (= (user-continue) 1) (recur (clojure-solution)))
		)
	)	
)

(main)

