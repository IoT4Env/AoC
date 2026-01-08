import sys


from fshandler import read_file, FileExtensions, get_logger

input1_logger = get_logger(__name__)

def solve_part1(input1: str) -> int:
	try:
		input1_lines: list[str] = read_file(input1, FileExtensions.TXT)

		current_floor: int = 0
		# For "one-line" input files
		if len(input1_lines) == 1:
			innput_single = input1_lines[0]
			
			move_up_count = sum((1 for c in innput_single if c == '('))
			move_down_count = sum((1 for c in innput_single if c == ')'))
			current_floor = move_up_count - move_down_count
			return current_floor

	except Exception as error:
		input1_logger.error(error)
		return 0

def main() -> None:
	solution = solve_part1(str(sys.argv[1]))
	print(solution)


if __name__ == "__main__":
	main()
