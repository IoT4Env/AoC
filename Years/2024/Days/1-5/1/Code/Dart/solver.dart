import 'dart:io';

import 'part1Solution.dart';
import 'part2Solution.dart';


void main() async{
	while(true){
		printMenu();

		int? validUserInput = getPartToExecute();
		if(validUserInput == null){
			continue;
		}

		switch(validUserInput){
			case 0:
				print("Bye and happy holidays!");
				return;
			case 1:
				var solution = new Part1Solution();
				print(await solution.execute());
				break;
			case 2:
				var solution = new Part2Solution();
				print(await solution.execute());
				break;
		}

		bool userContinue = isUserContinue();
		if(!userContinue){
			print("Bye and happy holidays!");
			return;
		}
	}
}

void printMenu(){
	print("\x1B[2J\x1B[0;0H"); // clear entire screen, move cursor to 0;0

	print("*******************************************");
	print("*** Dart solution for Day 1 of AoC 2024 ***");
	print("*******************************************");

	print("\nAvailable solution(s)");
	print("-------------");
	print("| 1: Part1  |");
	print("| 2: Part2  |");
	print("| 0: Exit   |");
	print("-------------");
}

bool isUserContinue(){
	print("Would you like to execute another part? [y/n]");
	String? userInput = stdin.readLineSync();

	if(userInput == null){
		return false;
	}

	return userInput == 'y' || userInput == 'Y';
}

int? getPartToExecute(){
	print("Type the part number you want to execute: ");
	String? userInput = stdin.readLineSync();

	if(userInput == null){
		print("Invalid input. Exiting...");
		return null;
	}

	int validUserInput = 0;
	List<int> validInputs = [0,1,2];
	try{
		validUserInput = int.parse(userInput);

		// Tries to get value from valid input based on the provided input.
		// If it fails, the catch block will be triggered.
		var test = validInputs[validUserInput];
	}catch (error) {
		print("Invalid user input!");
		print("It should be either 0, 1 or 2");
		return null;
	}

	return validUserInput;
}


