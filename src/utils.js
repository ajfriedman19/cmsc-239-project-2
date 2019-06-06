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

/************************************************************************************************************************
	aggregateByCommunityAndMonths(data, startMonth, endMonth)

	INPUTS
	- data: the csv file
	- startMonth: an integer from 1 to 12, representing the month in 2010 we start aggregating data 
	- endMonth: an integer from 1 to 12, representing the month in 2010 we stop aggregating data

	RETURNS
	Dictionary with its keys being community names, and its values being the total kwh consumption of all the buildings
	in that community, between startMonth and endMonth inclusive.  

	REMARKS
	Require that startMonth < endMonth. 
**************************************************************************************************************************/

export function aggregateByCommunityAndMonths(data, startMonth, endMonth) {
	const monthColumns = ['KWH JANUARY 2010', 'KWH FEBRUARY 2010', 'KWH MARCH 2010', 'KWH APRIL 2010', 'KWH MAY 2010',
	'KWH JUNE 2010', 'KWH JULY 2010', 'KWH AUGUST 2010', 'KWH SEPTEMBER 2010', 'KWH OCTOBER 2010', 'KWH NOVEMBER 2010', 'KWH DECEMBER 2010'];
	const kwhByCommunityAndMonths = {};
	const startIndex = startMonth - 1;
	const endIndex = endMonth - 1; 
	for (var i = 0; i < data.length; i ++) {
		var name = data[i]['COMMUNITY AREA NAME']; 
		if (!(name in kwhByCommunityAndMonths)) {
			kwhByCommunityAndMonths[name] = 0;
		} 
		for (var j = startIndex; j < endIndex; j ++) {
			kwhByCommunityAndMonths[name] = kwhByCommunityAndMonths[name] + Number(data[i][monthColumns[j]]);
		}
	}
	return kwhByCommunityAndMonths;
}