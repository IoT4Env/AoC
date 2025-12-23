import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:core';


import 'fileParseHandler.dart';


class Part2Solution{
	Future<int> execute() async{
		var parser = new FileParseHandler();
		var matrix = await parser.parseFile<List<List<int>>>("input1.txt", parseInput1);

		// NULL CHECK SAFETY
		if(matrix == null){
			return 0;
		}

		if(matrix.length != 2){
			return 0;
		}

		var column1 = matrix[0];
		var column2 = matrix[1];

		// Get total difference and prints the result.
		int totalSimilarity = getTotalSimilarity(column1, column2);
		return totalSimilarity;
	}

	Future<List<List<int>>> parseInput1(Stream<String> lines) async{
		List<int> column1 = [];
		List<int> column2 = [];
		await for(var line in lines){
			if(line.isEmpty){
				continue;
			}
			var lineSplitted = line.split(' ');
			column1.add(int.parse(lineSplitted.first));
			column2.add(int.parse(lineSplitted.last));
		}

		return [column1, column2];
	}


	int getTotalSimilarity(List<int> column1, List<int> column2){
		int totalSimilarity = 0;
		for(var number in column1){
			var occurences = column2.where((n) => n == number).length;
			totalSimilarity += occurences * number;
		}

		return totalSimilarity;
	}
}
