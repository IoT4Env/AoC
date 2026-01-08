import sys, re


from fshandler import read_file, FileExtensions, get_logger

input1_logger = get_logger(__name__)

def to_tuple(line) -> tuple[int, int]:
    splitted_line = re.sub(' +', ' ', line).split(' ')
    return int(splitted_line[0]), int(splitted_line[1])

def solve_part1(input1: str) -> int:
    try:
        input1_lines: list[str] = read_file(input1, FileExtensions.TXT)

        table = [to_tuple(line) for line in input1_lines if line != '\n']

        column1 = [column1 for column1, _ in table]
        column2 = [column2 for _, column2 in table]

        column1.sort()
        column2.sort()

        table = list(zip(column1, column2))

        total_sum = sum([abs(column1 - column2) for column1, column2 in table])
        return total_sum
    except Exception as error:
        input1_logger.error(error)
        return 0
    
def main():
    solution = solve_part1(str(sys.argv[1]))
    print(solution)

if __name__ == "__main__":
    main()
