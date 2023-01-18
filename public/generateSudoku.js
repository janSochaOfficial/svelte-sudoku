const newSudo = []

	const obj = {
		puzzle: '41--75-----53--7--2-36-81--7-9--25-1-3--9-47--2-1-7---6587--9-----26-8--1925---47',
		solution: '416975238985321764273648159769432581531896472824157396658714923347269815192583647',
		difficulty: 'easy',
	};

	for (let i = 0; i < 9; i++){

		newSudo.push([])
		for (let j = 0; j < 9; j++){
			const num = (obj.puzzle[i * 9 + j] == "-")? null : Number(obj.puzzle[i * 9 + j])
			const ans = Number(obj.solution[i * 9 + j])
			newSudo[i].push({
				num: num,
				hints: [],
				ans: ans
			})
		}
	}
	console.log(newSudo)
	console.log(JSON.stringify(newSudo))