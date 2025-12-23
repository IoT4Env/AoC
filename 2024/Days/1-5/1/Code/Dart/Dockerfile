# Downloads official dart SDK
FROM dart:stable

# Copies source code into the dart folder inside docker
COPY . /usr/aoc/dart

# Sets current working directory inside docker
WORKDIR /usr/aoc/dart

# Execute the dart solution
CMD ["dart", "run", "solver.dart"]
