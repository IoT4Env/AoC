;; Referencing this video:
;; https://www.youtube.com/watch?v=8aCO_wNuScQ
(ns dev.solver)

(require '[java-time.api :as jt])
(require '[clojure.java.io :as io])


(defn print-menu [year day]
	;; This menu is always visible
	(print (str (char 27) "[2J")) ;; Clears the screen
	(print (str (char 27) "[;H")) ;; Moves the cursor to the top left corner

	(println "**********************************************")
	(println "******** !WELCOME-TO-AOC-IN-CLOJURE! *********")
	(println "**********************************************")


	;; Conditional menu printing to show where the user is in the menu
	(or (not year) day (println (format "****** YEAR=%d *****************************" year)))

	;; The day part formats the number to have 2 digits with trailing zeros to the left (if (< day 10))
	(or (not year) (not day) (println (format "****** YEAR=%d **************** DAY=%02d *****" year day)))


	(println "\nType 0 to go up by one in the menu")
	(println "Press Ctrl + C to exit")
)

;; AOC contants
(def aoc-start-year 2015)
(def aoc-december-days 25)
(def aoc-day-parts 2)


;; File System contants
(def current-folder-path (System/getProperty "user.dir")) ;; Inside Docker
(def aoc-folder-path (.getParent (io/file (.getParent (io/file current-folder-path)))))

(def day-chunks [[1,2,3,4,5], [6,7,8,9], [10,11,12,13,14,15], [16,17,18,19], [20,21,22,23,24,25]])

(defn print-range [start end]
	(println (str "[ " start " ]"))
	
	;; Continue calling this function until for the specified range
	(if (< start end) (print-range (+ start 1) end))
)

(defn user-continue []
	(print "Press ENTER to continue...")
	(flush) ;; Makes user input work
	(read-line)
)

(defn ask-year []
	;; Get current year
	(def current-date (jt/local-date))
	(def current-year (read-string (jt/format "yyyy" current-date)))

	;; Check if AoC is ready for the current year
	(def current-month (read-string (jt/format "MM" current-date)))

	;; Define current-aoc-year taking into account if the current month is December
	(def current-aoc-year (if (not (= current-month 12)) (- current-year 1) current-year))

	(print-range aoc-start-year current-aoc-year)

	;; Defining prompt text because used later to position cursor inside brackets.
	(def year-prompt "What year would you like to solve days from? [      ]")
	(print year-prompt)

	;; Construct a command to move the cursor inside the squae brackets
	;; It first goes to the start of the line WITHOUT OVERWRITING ITS CONTENT and then moves to the right to stay inside the square brackets
	(print (str (char 27) "[" (- (count year-prompt) 5) "G"))

	(flush) ;; Makes user input work

	(def year-input (read-string (read-line)))

	;; Check if provided input was a number
	(if (number? year-input) 
		(if (and (>= year-input aoc-start-year) (<= year-input current-year))
			year-input
			(if (= year-input 0) 0
				(do
					(println (str "Must insert a number between " aoc-start-year " and " current-year))
					(user-continue)
					-1
				)
			)
	) (do
		(println "Must provide a number")
		(user-continue)
		-1
	))
)

(defn ask-day []
	;; Print days
	(print-range 1 aoc-december-days)

	;; Defining prompt text because used later to position cursor inside brackets.
	(def day-prompt "What day would you like to get solutions from? [    ]")
	(print day-prompt)

	;; Construct a command to move the cursor inside the squae brackets
	;; It first goes to the start of the line WITHOUT OVERWRITING ITS CONTENT and then moves to the right to stay inside the square brackets
	(print (str (char 27) "[" (- (count day-prompt) 3) "G"))

	(flush) ;; Makes user input work

	(def day-input (read-string (read-line)))

	;; Check if provided input was a number
	(if (number? day-input) 
		(if (and (>= day-input 1) (<= day-input aoc-december-days))
			day-input
			(if (= day-input 0) 0
				(do
					(println (str "Must insert a number between 1 and " aoc-december-days))
					(user-continue)
					-1
				)
			)
	) (do
		(println "Must provide a number")
		(user-continue)
		-1
	))
)

(defn ask-part []
	;; Print parts
	(print-range 1 aoc-day-parts)

	;; Defining prompt text because used later to position cursor inside brackets.
	(def part-prompt "What part do you want to execute? [   ]")
	(print part-prompt)

	;; Construct a command to move the cursor inside the squae brackets
	;; It first goes to the start of the line WITHOUT OVERWRITING ITS CONTENT and then moves to the right to stay inside the square brackets
	(print (str (char 27) "[" (- (count part-prompt) 2) "G"))

	(flush) ;; Makes user input work

	(def part-input (read-string (read-line)))

	;; Check if provided input was a number
	(if (number? part-input) 
		(if (and (>= part-input 1) (<= part-input aoc-day-parts))
			part-input
			(if (= part-input 0) 0
				(do
					(println (str "Must insert a number between 1 and " aoc-day-parts))
					(user-continue)
					-1
				)
			)
	) (do
		(println "Must provide a number")
		(user-continue)
		-1
	))
)


(defn execute-part [path part]
	(def solution-file (str path "part" part "Solution.clj"))
	(if (.exists (io/file solution-file))
		(do
			(print (str "Solution for part " part " is: "))
			(load-file solution-file)
			(user-continue)
		)
	)
)


(defn get-day-chunk [day]
	(loop [index 0]
		(when (< index (count day-chunks))
			(do
				(def chunk (nth day-chunks index))
				(if (some #{day} chunk) (str (first chunk) "-" (last chunk)) (recur (inc index)))
			)
		)
	)
)


;; Defined variables can be accessed even on next iteration...
;; We can manipulate year, day and part while maintaining their previous value.
(defn clojure-solution [index]
	;; Menu navigation by index
	(case index
		;; Ask year
		1 (do
			(print-menu nil nil)

			(def year (ask-year))

			(if (= year 0) 0
				(if (< year 0) 1;; The input was invalid, ask year again.
					;; Check if the year folder exists
					(if (.isDirectory (io/file (str aoc-folder-path "/Years/" year))) 
						(do
							;; No need to check if InputFiles exists, since it will not be in the docker container if it was not created first anyway...
							;; (if (not (.isDirectory (io/file (str aoc-folder-path "/Years/" year "/InputFiles"))))
							;; 	(do
							;; 		(println "Create folder.")
							;; 	)
							;; )

							2
						)
						(do
							(println (str "Year " year " has no solutions available"))
							(user-continue)
							1
						)
					)
				)
			)
		)
		;; Ask day
		2 (do
			(print-menu year nil)

			(def day (ask-day))

			(if (= day 0) 1
				(if (< day 0) 2;; The input was invalid, ask day again.
					;; Check if the input file for the selected day exists
					(do
						(def input-file-path (str aoc-folder-path "/Years/" year "/InputFiles/input" day ".txt"))
						(if (not (.exists (io/file input-file-path)))
							(do
								(println (str "The input file for day " day " is missing"))
								(println (str "Create it in the \"InputFiles\" directory inside the year " year))
								(user-continue)
								2
							)
							(do
								;; Get chunk string where the selected day is included.
								(def chunk (get-day-chunk day))

								;; Get the Clojure solution day path in Clojure
								(def clojure-solutions-path (str aoc-folder-path "/Years/" year "/Days/" chunk "/" day "/Code/Clojure/"))

								;; Check if this day has any Clojure solution
								(if (.isDirectory (io/file clojure-solutions-path)) 3 
									(do
										(println "This day does not have a solution yet :(")
										(user-continue)
										2
									)
								)
							)
						)
					)
				)
			)
		)
		3 (do
			(print-menu year day)

			(def part (ask-part))

			(if (= part 0) 2 
				(if (< part 0) 3;; The input was invalid, ask day again.
					(do
						(execute-part clojure-solutions-path part)
						3
					)
				)
			)

			;; (if (= part 0) 2 (if (< part 0) 3 (do (execute-part part) 3)))
		)
		0
	)
)

(defn -main []
	;; Initialize menu from the first index (wich asks for the year)
	(loop [index (clojure-solution 1)]
		(when (not(= index 0))
			(recur (clojure-solution index)))
	)

	(println "Happy holidays / new year from Clojure!")
)
