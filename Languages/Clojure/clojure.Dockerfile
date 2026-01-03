# WARNING
# DOCKERFILE CONTEXT IS 2 DIRECTORYES ABOVE THIS FOLDER
# Downloads official clojure image (CLI support)
FROM clojure:tools-deps

# Copies clojure source code of every day inside Docker (Including InputFiles folders)
COPY ./Years/ /usr/aoc/Years/

# COPY the solver.clj (where the Dockerfile resides)
COPY ./Languages/Clojure/ /usr/aoc/Languages/Clojure/

# Sets current working directory inside docker
WORKDIR /usr/aoc/Languages/Clojure/

# Execute the clojure solution
CMD ["clj", "-M", "-m", "dev.solver"]
