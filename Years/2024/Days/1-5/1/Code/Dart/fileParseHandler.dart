import 'dart:async';
import 'dart:convert';
import 'dart:io';


class FileParseHandler{
	Future<T?> parseFile<T>(String file_path, Future<T> Function(Stream<String>) processor) async{
		// When dealing with try catch, REMEMBER TO RETUN SOMTHING IN THE CATCH AS WELL...
		try{
			// Final ensures no other assignment can be done to this variable after initial assignment.
			final inputFile = File(file_path);

			// Read file and returns a buffer of lines.
			Stream<String> lines = inputFile.openRead()
				.transform(utf8.decoder)
				.transform(LineSplitter());

			// Executes custom function to transform the input file data.
			return await processor(lines);

		}on PathNotFoundException catch (error){
			print("File not found error: ${error}");
			return null;
		}on FileSystemException catch(error){
			print("Attempted to perform operation on non existing file: ${error}");
			return null;
		}
	}
}
