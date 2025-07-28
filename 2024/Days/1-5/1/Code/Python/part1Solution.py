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

            table = [to_tuple(line) for line in lines]

            column1 = [column1 for column1, _ in table]
            column1.sort()

            column2 = [column2 for _, column2 in table]
            column2.sort()

            table = list(zip(column1, column2))

            total_sum = sum([abs(column1 - column2) for column1, column2 in table])
            print(total_sum)
        
    except Exception as error:
        print(error)

if __name__ == "__main__":
    main()
