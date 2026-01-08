# built-in modules
from pathlib import Path
import logging
from logging import Logger
from enum import Enum


# Default logging configuration
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


def get_logger(name) -> Logger:
	return logging.getLogger(name)

day1_logger = get_logger(__name__)

# region Enums
class FileExtensions(Enum):
	TXT = "txt"

#endregion


# region Exceptions
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

#endregion


# region Handlers
def read_file(file_path: str, valid_extension: FileExtensions) -> list[str]:
	"""
	Reads the specified file and returns its lines in a list of strings.
	Empty lines are treated as a Line Feed character ('\\n')
	
	:param file_path: File path
	:type file_path: str
	:param valid_extension: File extension
	:type valid_extension: FileExtensions
	:return: Lines read.
	:rtype: list[str]
	"""

	try:
		path = Path(file_path)
		is_file: bool = path.is_file()
		if not is_file:
			raise ReadDirectoryException(f"{file_path} is not a file.")
		
		extension: str = get_file_extension(path)
		if extension != valid_extension.value:
			raise InvalidFileException(valid_extension.value)

		with open(file_path, 'r', encoding='utf-8') as input1_file:
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

def get_file_extension(path: Path) -> str:
		"""
		Instead of returning .extension, this function only returns extension
		
		:param path: Path object for a file
		:type path: Path
		:return: Extension anme without punctuation (EG: txt)
		:rtype: str
		"""
		return path.suffix[1:] #Manually removing the '.' from the extension

#endregion
