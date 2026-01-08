import sys

from fshandler import read_file, FileExtensions, get_logger

input1_logger = get_logger(__name__)

def solve_part2(input1: str) -> int:
	try:
		input1_lines: list[str] = read_file(input1, FileExtensions.TXT)

		current_floor: int = 0
		
		# For "one-line" input files
		if len(input1_lines) == 1:
			innput_single = input1_lines[0]
			for i, c in enumerate(innput_single, 1):
				current_floor += 1 if c == '(' else -1
				if current_floor == -1:
					return i
		
		raise Exception("Provided input does not bring you to the basement at any point!")

	except Exception as error:
		input1_logger.error(error)
		return 0


def main() -> None:
	solution = solve_part2(str(sys.argv[1]))
	print(solution)


if __name__ == "__main__":
	main()
