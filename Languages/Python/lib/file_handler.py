# built-in modules
from pathlib import Path

# Custom modules
from Languages.Python.lib.custom_exceptions import FileExtensions, InvalidFileException, ReadDirectoryException
from Languages.Python.lib.logger import get_logger
from Languages.Python.lib.file_extensions import FileExtensions


day1_logger = get_logger(__name__)


def read_file(file_path: str, valid_extension: FileExtensions) -> list[str]:
	"""
	Reads the specified file and returns its lines in a list of strings.
	
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


# class FileHandler():
# 	file_path: Path

# 	def __init__(self, file_path: str):
# 		self.file_path = Path(file_path)

	
# 	def get_file_extension(file_path: Path) -> str:
# 		"""
# 		Instead of returning .extension, this function only returns extension
		
# 		:param file_path: Path object for a file
# 		:type file_path: Path
# 		:return: Extension anme without punctuation (EG: txt)
# 		:rtype: str
# 		"""
# 		return file_path.suffix[1:] #Manually removing the '.' from the extension


# 	def read_file(self, valid_extension: FileExtensions, txt_file_path: str) -> list[str]:
# 		"""
# 		Reads the specified TXT file and returns its lines in a list of strings.
		
# 		:param txt_file_path: TXT file path
# 		:type file_path: str
# 		:return: Lines read.
# 		:rtype: list[str]
# 		"""

# 		try:
# 			file_path = Path(txt_file_path)
# 			is_file: bool = file_path.is_file()
# 			if not is_file:
# 				raise ReadDirectoryException(f"{txt_file_path} is not a file.")
			
# 			extension: str = self.get_file_extension(file_path)
# 			if extension != valid_extension:
# 				raise InvalidFileException(valid_extension.value)

# 			with open(txt_file_path, 'r', encoding='utf-8') as input1_file:
# 				return input1_file.readlines()
# 		except FileNotFoundError as error:
# 			day1_logger.error("Provided file path does not exists")
# 			return []
# 		except ReadDirectoryException as error:
# 			day1_logger.error(error.message)
# 			return []
# 		except InvalidFileException as error:
# 			day1_logger.error(error._message)
# 		except Exception as error:
# 			day1_logger.fatal(f"Unhandled exception!\n{error}")
# 			return []
