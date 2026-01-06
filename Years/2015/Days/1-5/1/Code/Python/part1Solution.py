import sys, logging
from enum import Enum
from pathlib import Path



day1_logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


class FileExtensions(Enum):
	TXT = "txt"


class ReadDirectoryException(BaseException):
	def __init__(self, message: str):
		super().__init__(message)
		self.message = message
	
	def __str__(self):
		return self.message

class InvalidFileException(BaseException):
	def __init__(self, file_extension: FileExtensions):
		super().__init__(file_extension)
		self.file_extension = file_extension
		self._message = f"Must be a {self.file_extension.name} file"
	
	def __str__(self):
		return self._message

def get_file_extension(file_path: Path) -> str:
	"""
	Instead of returning .extension, this function only returns extension
	
	:param file_path: Path object for a file
	:type file_path: Path
	:return: Extension anme without punctuation (EG: txt)
	:rtype: str
	"""
	return file_path.suffix[1:] #Manually removing the '.' from the extension


def read_file(txt_file_path: str) -> list[str]:
	"""
	Reads the specified TXT file and returns its lines in a list of strings.
	
	:param txt_file_path: TXT file path
	:type file_path: str
	:return: Lines read.
	:rtype: list[str]
	"""

	try:
		file_path = Path(txt_file_path)
		is_file: bool = file_path.is_file()
		if not is_file:
			raise ReadDirectoryException(f"{txt_file_path} is not a file.")
		
		extension: str = get_file_extension(file_path)
		if extension != FileExtensions.TXT.value:
			raise InvalidFileException(FileExtensions.TXT)

		with open(txt_file_path, 'r', encoding='utf-8') as input1_file:
			return input1_file.readlines()
	except FileNotFoundError as error:
		day1_logger.error("Provided file path does not exists")
		return []
	except ReadDirectoryException as error:
		day1_logger.error(error.message)
		return []
	except InvalidFileException as error:
		day1_logger.error(error._message)
	except Exception as error:
		day1_logger.fatal(f"Unhandled exception!\n{error}")
		return []

def solve_day1(input1: str) -> any:
	input1_lines: list[str] = read_file(input1)

	current_floor: int = 0
	# For "one-line" input files
	if len(input1_lines) == 1:
		innput_single = input1_lines[0]
		
		move_up_count = sum((1 for c in innput_single if c == '('))
		move_down_count = sum((1 for c in innput_single if c == ')'))
		current_floor = move_up_count - move_down_count
		return current_floor

def main() -> None:
	print(solve_day1(str(sys.argv[1])))


if __name__ == "__main__":
	main()
