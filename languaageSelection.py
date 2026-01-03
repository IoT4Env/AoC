"""
*******  Docstring for main  *******
This script covers all languages used so far in at least one day of any AoC year.
It lists these languages and executes the selected solution via a docker build command.

Written in Python since it is the languag I use the most.
Enjoy and happy new year in advance!!!
"""

import subprocess
from pathlib import Path


# Constants
AOC_FOLDER = Path.cwd()
LANGUAGES_FOLDER = 'Languages'


# Dictionary with required command to execute each language
language_commands = {
	"Python": "python3 ./Languages/Python/solver.py",
	"Clojure": "docker buildx build -t clojure-app -f ./Languages/Clojure/clojure.Dockerfile . && docker run -it --rm --name running-app clojure-app"
}


class Language(list):
    def __getitem__(self, n):
        if n < 0:
            raise IndexError()
        return list.__getitem__(self, n)


def main() -> None:
	while True:
		try:
			# Show menu for all languages used so far
			language = language_menu_interaction()
			if language is None:
				prompt_continue()
				continue

			return_code = execute_language(language)
			if return_code < 0:
				prompt_continue()
				continue



		except KeyboardInterrupt:
			print("\nBye and happy holidays / new year!")
			return

def prompt_continue() -> None:
	input("Press ENTER to continue...")

def get_available_languages() -> Language:
	"""
	List all directoryes inside the languages folder.
	
	:return: Any language used in any AoC year.
	:rtype: list[str]
	"""
	languages_path = AOC_FOLDER.glob(f'./{LANGUAGES_FOLDER}/*')
	return Language(file.name for file in languages_path if not file.is_file())
	# return [file.name for file in languages_path if not file.is_file()]

def language_menu_interaction() -> str | None:
	"""
	Prints a menu with programming languages to chose from.
	
	:return: Language name chosen by the user.
	:rtype: str | None
	"""
	languages: list[str] = get_available_languages()

	print(chr(27) + "[2J") # Clears screen
	print(chr(27) + "[;H") # Moves cursor at the top

	# Brief welcome text
	print("**************************************************************")
	print("**** Advent of Code problems to solve in varius languages ****")
	print("**************************************************************")
	print("Press Ctrl + C to exit")

	# Loops on each language and prints it on screen.
	[print(f"{i} => {language}") for i, language in enumerate(languages, 1)]

	# Ask the user what language to execute
	print("Chose the language you want to execute solution form: [    ]",
		end='\rChose the language you want to execute solution form: [ ',
		flush=True)
	language_choise = input()

	try:
		possible_valid_choise = int(language_choise)
		return languages[possible_valid_choise - 1]
	except IndexError:
		print("Invalid input.")
		print(f"Must select a number between 1 and {len(languages)}.")
		return None
	except ValueError:
		print("Invalid input.")
		print("Must provide a number.")
		return None


def execute_language(language: str) -> int:
	# Executes the language by index (may vary as languages increases or decreases).
	# The execution is done via the os module that executes a specific docker build command for the specified folder	
	language_command = language_commands[language]

	commands = language_command.split(' && ')

	try:
		for command in commands:
			cmd = command.split(' ')
			result = subprocess.run(
			cmd,
				stdout=None,
				stderr=None,
				check=True,
				# capture_output=True,
				# text=True,
				# shell=False
			)

			if result.returncode != 0:
				raise Exception(f"Something went wrong when executing the following command:\n{command}")

		return 0
	except Exception as error:
		print(error)
		return -1

	# If it goes right, returns 0, else -1 (thus the int return type).
	

if __name__ == "__main__":
	main()
