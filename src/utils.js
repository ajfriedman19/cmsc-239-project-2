// you can put util functions here if you want

export function create_pairs(data) {
	const rowObject = {};
	console.log("testing")
	data.forEach((curr, idxRow) => {
		const keys = Object.keys(curr)
		keys.forEach((currOut, idxOut) => {
			keys.forEach((currInner, idxInner) => {
				if ((idxOut < idxInner) && currOut && currInner) {
					const new_name = `${curr[currOut]}_${curr[currInner]}`;
					if (new_name in rowObject) {
						rowObject[new_name][0] += 1;
						rowObject[new_name][1][2].push(idxRow);
					} else if (!(new_name in rowObject)) {
						rowObject[new_name] = [1, [[curr[currOut], curr[currInner]], [idxOut, idxInner], [idxRow]]];
					}
				}

			});

		});
	});
	console.log("testing")
	console.log(rowObject)
	return rowObject;
}