(use 'clojure.java.io)


;; Extract columns from input file
(def column1 [])
(def column2 [])
(with-open [input-file (reader "input1.txt")]
	;; Iterate through each non-empty line in the file
	(doseq [line (filter #(not (empty? %)) (line-seq input-file))]
	(when (not (empty? line)))
		;; Split string by space
		(def cells (clojure.string/split line #" "))

		;; Adds values converted as integers to both columns
		(def column1 (conj column1 (read-string (first cells))))
		(def column2 (conj column2 (read-string (last cells))))
	)
)

;; Sort columns
(def column1 (sort column1))
(def column2 (sort column2))

;; Computes difference for each pair in both arrays
(defn compute-difference [a b] (abs (- a b)))


(defn main []
	(def differences (map compute-difference column1 column2))
	
	;; Sums differences and prints the result on screen
	(def total-difference (apply + differences))
	(println total-difference)
)


(main)
