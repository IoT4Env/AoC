import sys


depth = int(sys.argv[2])

# Dynamically find the folder where common Python scripts resides.
# This avoids re-writing them for each solution!
sys.path.append('../' * depth)
from Languages.Python import read_file, FileExtensions

def solve_part2(input1: str) -> int:
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


def main() -> None:
	solution = solve_part2(str(sys.argv[1]))
	print(solution)


if __name__ == "__main__":
	main()
