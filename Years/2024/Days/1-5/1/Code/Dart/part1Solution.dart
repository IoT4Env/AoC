import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:core';


import 'fileParseHandler.dart';


class Part1Solution{
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

		// Sort columns
		column1.sort();
		column2.sort();
		
		// Get total difference and prints the result.
		int totalDifference = getTotalDifference(column1, column2);
		return totalDifference;
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


	int getTotalDifference(List<int> column1, List<int> column2){
		int totalDifference = 0;
		for(int i = 0; i < column1.length; i++){
			totalDifference += (column1[i] - column2[i]).abs();
		}
		return totalDifference;
	}
}
