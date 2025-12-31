#!/usr/bin/env -S godot -s
extends SceneTree

func _init() -> void:
	#Read input file content
	var file_content = load_from_file()
	
	#Extract columns
	var rows = file_content.split("\n")
	var columns = get_columns(rows)
	
	#Sort columns in ascending order
	columns[0].sort()
	columns[1].sort()
	
	#Get total distance
	var distance = get_total_distance(columns[0], columns[1])
	print(distance)
	quit()

func get_total_distance(column1, column2):
	var distance = 0
	
	for index in range(len(column1)):
		distance += abs(column1[index] - column2[index])
	
	return distance

func get_columns(rows: Array[String]):
	var column1 = []
	var column2 = []
	for row in rows:
		if not row.contains(" "):
			continue
		var values = row.split(' ')
		column1.append(int(values[0]))
		column2.append(int(values[len(values) - 1]))
	
	return [column1, column2]

func load_from_file() -> String:
	var file = FileAccess.open("res://input1.txt", FileAccess.READ)
	var content = file.get_as_text()
	file.close()
	return content
