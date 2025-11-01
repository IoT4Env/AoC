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


;; Returns an array of numbers corresponsint to how many times a number in column1 appear in column2
(defn get-count-occurences [column1 column2]
	(def occurences [])
	(doseq [element column1]
		(def occurence-count (count (filter #(= % element) column2)))
		(def occurences (conj occurences occurence-count))
	)

	occurences
)


;; Evaluates the multiplication between the occurences of column with the given array
(defn compute-similarity [column occurences]
	(* column occurences)
)


;; Main function
(defn main []
	(def column1-occurences (get-count-occurences column1 column2))
	(def similarities (map compute-similarity column1 column1-occurences))
	
	;; Sums similarities and prints the result on screen
	(def total-similarity (apply + similarities))
	(println total-similarity)
)


(main)
