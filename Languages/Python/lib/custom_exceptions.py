# Custom modules
from Languages.Python.lib.file_extensions import FileExtensions


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
