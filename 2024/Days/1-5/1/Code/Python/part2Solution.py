import os, re


def main():
    try:
        current_dir = os.getcwd()
        with open(f"{current_dir}/input1.txt", 'r') as input1_file:
            input1 = input1_file.read()
            lines = input1.split('\n')
            lines.remove('')

            def to_tuple(line) -> tuple[int, int]:
                splitted_line = re.sub(' +', ' ', line).split(' ')
                return int(splitted_line[0]), int(splitted_line[1])

            table: list[tuple[int, int]] = [to_tuple(line) for line in lines]

            column1 = [column1 for column1, _ in table]
            column2 = [column2 for _, column2 in table]

            def calculate_occurences(value, occurence):
                return value * occurence

            similarity = [calculate_occurences(value, column2.count(value))  for value in column1 if value in column2]
            print(sum(similarity))
        
    except Exception as error:
        print(error)

if __name__ == "__main__":
    main()
