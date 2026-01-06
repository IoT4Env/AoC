import sys, re


depth = int(sys.argv[2])

# Dynamically find the folder where common Python scripts resides.
# This avoids re-writing them for each solution!
sys.path.append('../' * depth)
from Languages.Python import read_file, FileExtensions, get_logger


input1_logger = get_logger(__name__)

def to_tuple(line) -> tuple[int, int]:
    splitted_line = re.sub(' +', ' ', line).split(' ')
    return int(splitted_line[0]), int(splitted_line[1])

def calculate_occurences(value, occurence):
    return value * occurence

def solve_part2(input1: str) -> int:
    try:
        input1_lines: list[str] = read_file(input1, FileExtensions.TXT)

        table: list[tuple[int, int]] = [to_tuple(line) for line in input1_lines if line != '\n']

        column1 = [column1 for column1, _ in table]
        column2 = [column2 for _, column2 in table]

        def calculate_occurences(value, occurence):
            return value * occurence

        similarity = [calculate_occurences(value, column2.count(value)) for value in column1 if value in column2]
        return sum(similarity)
    
    except Exception as error:
        input1_logger.error(error)
        return 0


def main():
    solution = solve_part2(str(sys.argv[1]))
    print(solution)


if __name__ == "__main__":
    main()
