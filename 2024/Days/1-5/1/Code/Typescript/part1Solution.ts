class Part1Solution{
	// Reads a file and returns its content in utf-8 fencoding.
	readFile = async (file_name: string) => {
		const fs = await import('fs');

		return new Promise<string>((resolve, reject) => {
			fs.readFile(file_name, 'utf-8', (err, data) => {
				if (err) reject(err)

				resolve(data)
			});
		}).catch((error) => {
			if (error.code === 'ENOENT') {
				console.error('File not found');
			} else {
				console.error(`Error: ${error.message}`);
			}
			process.exit(1)
		})
	};


	getMatrix = (content: string) => {
		let column1: Array<number> = []
		let column2: Array<number> = []

		let rows = content.split('\n')
		rows.forEach(row => {
			const values = row.split(' ')

			// Defaults empty lines as 0
			const num1 = parseInt(values[0]) || 0
			const num2 = parseInt(values[values.length - 1]) || 0

			column1.push(num1)
			column2.push(num2)
		})

		return [column1, column2]
	}

	getDifference = (matrix: Array<Array<number>>) => {
		const differenceMap = matrix[0].map((num, index) => Math.abs(num - matrix[1][index]));
		return differenceMap.reduce((accumulator, number) => accumulator + number)
	}
}


(async _ => {
	const part1Solution = new Part1Solution()
	const content: string = await part1Solution.readFile('input1.txt');

	const matrix = part1Solution.getMatrix(content)

	matrix[0].sort()
	matrix[1].sort()

	const totalDifference = part1Solution.getDifference(matrix)
	console.log(totalDifference);
})()

