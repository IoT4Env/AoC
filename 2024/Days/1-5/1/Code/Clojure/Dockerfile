# Downloads official clojure image (CLI support)
FROM clojure:tools-deps

# Copies source code into the aoc folder inside docker
COPY . /usr/clojure/aoc

# Sets current working directory inside docker
WORKDIR /usr/clojure/aoc

# Execute the clojure solution
CMD ["clojure", "-M", "solver.clj"]
