import sys


depth = int(sys.argv[2])

# Dynamically find the folder where common Python scripts resides.
# This avoids re-writing them for each solution!
sys.path.append('../' * depth)
from Languages.Python import read_file, FileExtensions, get_logger


input2_logger = get_logger(__name__)

def is_strictly_ascending(level1: int, level2: int) -> bool:
	return level1 < level2

def is_strictly_descending(level1: int, level2: int) -> bool:
	return level1 > level2

def is_safe(report: str) -> bool:
	levels: list[int] = [int(lvl) for lvl in report.split(' ')]
	for i in range(len(levels) - 1):
		# Check if levels are decreasing
		if levels[0] > levels[1]:
			if not is_strictly_descending(levels[i], levels[i+1]):
				return False
		# Check if levels are ascending
		elif levels[0] < levels[1]:
			if not is_strictly_ascending(levels[i], levels[i+1]):
				return False
		
		# Check if they differ by at least 1 and at most 3
		far_apart = abs(levels[i] - levels[i+1])
		if far_apart == 0 or far_apart > 3:
			return False

	return True


def solve_part1(input2) -> int:
	try:
		input2_lines: list[str] = read_file(input2, FileExtensions.TXT)

		report_safetiness = [is_safe(report) for report in input2_lines if report != '\n']
		return sum(report_safetiness)

	except Exception as error:
		input2_logger.error(error)
		return 0


def  main() -> None:
	solution = solve_part1(str(sys.argv[1]))
	print(solution)


if __name__ == "__main__":
	main()
