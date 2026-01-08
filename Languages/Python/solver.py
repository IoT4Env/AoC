# bare in mind that this script interacts with the whole AoC event (regardless of the year).
from datetime import datetime as dt
import subprocess
from pathlib import Path


# The year AoC was created
AOC_START_YEAR = 2015

# There are 25 days for each year, not 31 like the days in December
AOC_DECEMBER_DAYS = 25

# There are 2 parts to solve for every day
PARTS_PER_DAY = 2

# Days are subdivided in chunks in the file system
DAYS_CHUNKS = [
	("1-5", [1,2,3,4,5]),
	("6-9", [6,7,8,9]),
	("10-15", [10,11,12,13,14,15]),
	("16-29", [16,17,18,19]),
	("20-25", [20,21,22,23,24,25]),
]

def main() -> None:
	# SCRIPT CALLED BY OTHER SCRIPT LOCATED AT .AoC, SO NO NEED TO NAVIGATE TO PARENT FOLDERS.
	aoc_folder = Path.cwd()
	# aoc_folder = cwd.parent.absolute().parent.absolute()

	# Prepare variables
	year: int = None
	day: int = None
	part: int = None

	# Starts from printing the year
	menu_pointer = 1
	while True:
		try:
			if menu_pointer <= 0:
				return
			
			if menu_pointer == 1:
				# Print menu to welcome the user.
				print_menu()

				# Ask what year the user wants to solve days from
				year = ask_year()
				if year is None:
					continue

				if year == -1:
					menu_pointer -= 1
					continue
				
				# Create InputFiles folder if it does not exist
				input_files_folder = Path.joinpath(aoc_folder, f"Years/{year}/InputFiles")
				if not Path.exists(input_files_folder):
					# Create the InputFiles folder and missing parent folders if they do not exist
					# Since they are empty directoryes, they are not pushed to the remote by default.
					Path.mkdir(input_files_folder, parents=True, exist_ok=True)
				
				menu_pointer += 1

			if menu_pointer == 2:
				# Print menu to welcome the user (again).
				print_menu(year)

				# Ask what day the user wants to get solution from
				day = ask_day()
				if day is None:
					continue

				if day == -1:
					menu_pointer -= 1
					continue
				
				# Get input file path for this day
				input_file_path = Path.joinpath(aoc_folder, f"Years/{year}/InputFiles/input{day}.txt")
				if not Path.exists(input_file_path):
					print(f"The input file for day {day} is missing!")
					print(f"Create it in the \"InputFiles\" directory inside the year {year}")
					input("Press ENTER to continue...")
					continue
					
				# Navigate to the correct Python folder.
				current_chunk = None
				for chunk_key, days in DAYS_CHUNKS:
					if day in days:
						current_chunk = chunk_key
						break

				relative_python_path = f"Years/{year}/Days/{current_chunk}/{day}/Code/Python"
				absolute_python_path = Path.joinpath(aoc_folder, relative_python_path)

				if not Path.exists(absolute_python_path):
					print("This day does not have a solution yet :(")
					input("Press ENTER to continue...")
					continue
			
				menu_pointer += 1

			if menu_pointer == 3:
				# Print menu to welcome the user (this is getting old...).
				print_menu(year, day)

				# Ask what part to execute
				part = ask_part()
				if part is None:
					continue

				if part == -1:
					menu_pointer -= 1
					continue
					
				if part in list(range(1, PARTS_PER_DAY + 1)):
					python_solution_script = Path.joinpath(absolute_python_path, f"part{part}Solution.py")
					if not Path.exists(absolute_python_path):
						print("This part does not have a solution yet :(")
						continue

					# Execute selected part
					result = subprocess.run(
						["python3", python_solution_script, input_file_path],
							capture_output=True,
							text=True,
							check=False,
							cwd=absolute_python_path
					)

					if result.stderr:
						print(result.stderr)
					else:
						print(f"The solution for part {part} is: {result.stdout}")
				else:
					print("Invalid input!")
					print("Year should be a number")
			
			input("Press ENTER to continue...")
				
		except KeyboardInterrupt:
			return


def print_menu(year: int=None, day: int=None) -> None:
	# This function should print the menu for the year, day and part
	# The menu should always stay.

	print(chr(27) + "[2J") # Clears screen
	print(chr(27) + "[;H") # Moves cursor at the top

	print('**********************************************')
	print('********* !WELCOME-TO-AOC-IN-PYTHON! *********')
	print('**********************************************')

	if year is not None and day is not None:
		print(f"**** YEAR={year} ******************** DAY={day} ****")
	elif year is not None:
		print(f"**** YEAR={year} *******************************")
	else:
		print()
	print("Type 0 to go up by one in the menu")
	print("Press Ctrl + C to exit")

def ask_year() -> int | None:
	# Get list of years from the very AoC beginning
	today = dt.today()
	current_year: int = today.year
	current_month: int = today.month # one-based (1 = January; 12 means December)

	aoc_years: list[int] = [year for year in range(AOC_START_YEAR, current_year + (1 if current_month == 12 else 0))]
	aoc_years_formatted = [f"[ {year} ]" for year in aoc_years]

	# Print available Aoc years
	print("Available years: ")
	print('\n'.join(aoc_years_formatted))
	print()

	# Pretty way to ask for year input to the user.
	print("What year would you like to solve days from? [       ]",
		end='\rWhat year would you like to solve days from? [ ',
		flush=True)
	
	# Get and return year user input.
	year_input: str = input()
	try:
		year = int(year_input)
		if year < 0:
			raise IndexError
		elif year == 0:
			return -1

		# Not used. Just for testing the correct user input.
		_test_year = aoc_years[year - AOC_START_YEAR]
		
		return year
	except ValueError:
		print("Invalid input!")
		print("Year should be a number")
		input("Press ENTER to continue...")
		return None
	except IndexError:
		print("Invalid input!")
		print("Year should be one of the AoC years")
		input("Press ENTER to continue...")
		return None

def ask_day() -> int:
	december_days = [day for day in range(1, AOC_DECEMBER_DAYS + 1)]
	december_days_formatted = [f"[ {day} ]" for day in december_days]

	# Print available Aoc days
	print("Available days: ")
	print('\n'.join(december_days_formatted))
	print()

	# Pretty way to ask for year input to the user.
	print("What day would you like to get solutions from? [      ]",
		end='\r""What day would you like to get solutions from? [ ',
		flush=True)
	
	# Get and return day user input.
	day_input: str = input()
	try:
		day = int(day_input)
		if day < 0:
			raise IndexError
		elif day == 0:
			return -1

		# Not used. Just for testing the correct user input.
		_test_day = december_days[day - 1]
		
		return day
	except ValueError:
		print("Invalid input!")
		print("Day should be a number")
		input("Press ENTER to continue...")
		return None
	except IndexError:
		print("Invalid input!")
		print("Day should be one of the AoC days")
		input("Press ENTER to continue...")
		return None

def ask_part() -> int:
	problem_parts = [part for part in range(1, PARTS_PER_DAY + 1)]
	problem_parts_formatted = [f"[ {part} ]" for part in problem_parts]

	# Print available Aoc days
	print("Available parts: ")
	print('\n'.join(problem_parts_formatted))
	print()

	# Pretty way to ask for year input to the user.
	print("What part do you want to execute? [     ]",
		end='\r""What part do you want to execute? [ ',
		flush=True)
	
	# Get and return part user input.
	part_input: str = input()
	try:
		part = int(part_input)
		if part < 0:
			raise IndexError
		elif part == 0:
			return -1

		# Not used. Just for testing the correct user input.
		_test_part = problem_parts[part - 1]
		
		return part
	except ValueError:
		print("Invalid input!")
		print("Part should be a number.")
		input("Press ENTER to continue...")
		return None
	except IndexError:
		print("Invalid input!")
		print("Part should be one of the AoC day parts.")
		input("Press ENTER to continue...")
		return None


if __name__ == '__main__':
	main()
