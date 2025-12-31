# Reference: https://hub.docker.com/r/clfoundation/clisp#how-to-use-this-image
# Download official docker image of clisp
FROM clfoundation/clisp:latest

# Copies source code into the lisp folder inside docker
COPY . /usr/aoc/lisp

# Sets current working directory inside docker
WORKDIR /usr/aoc/lisp

# Execute the lisp solution
CMD ["clisp", "./solver.lisp"]
