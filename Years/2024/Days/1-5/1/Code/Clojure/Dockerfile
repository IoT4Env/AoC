# Downloads official clojure image (CLI support)
FROM clojure:tools-deps

# Copies source code into the clojure folder inside docker
COPY . /usr/aoc/clojure

# Sets current working directory inside docker
WORKDIR /usr/aoc/clojure

# Execute the clojure solution
CMD ["clojure", "-M", "solver.clj"]
