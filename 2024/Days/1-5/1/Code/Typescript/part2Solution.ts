class Part2Solution{
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

	getSimilarity = (matrix: Array<Array<number>>) => {
		//Count occurences
		const occurences = matrix[1].reduce((accumulator, number) => {
			if(matrix[0].includes(number)){
				accumulator[number] = (accumulator[number] || 0) + 1
			}
			return accumulator
		}, {})

		//Multiply occurences by associated value
		const similarityMap = Object.keys(occurences).map((number, index) => parseInt(number) * occurences[number])

		//Sum multiplyed values
		return similarityMap.reduce((accumulator, number) => accumulator + number)
	}
}

(async _ => {
	const part2Solution = new Part2Solution()

	const content: string = await part2Solution.readFile('input1.txt');

	const matrix = part2Solution.getMatrix(content)

	const totalSimilarity = part2Solution.getSimilarity(matrix)
	console.log(totalSimilarity);
})()

