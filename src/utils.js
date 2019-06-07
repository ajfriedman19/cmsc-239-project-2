// you can put util functions here if you want
import {tTestTwoSample} from 'simple-statistics';
import {tscore, ttest} from 'jstat';


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


export function aggregateByCommunityAndMonthsAlt(data, startMonth, endMonth, otherKey) {
  const monthColumns = ['KWH JANUARY 2010', 'KWH FEBRUARY 2010', 'KWH MARCH 2010', 'KWH APRIL 2010', 'KWH MAY 2010',
  'KWH JUNE 2010', 'KWH JULY 2010', 'KWH AUGUST 2010', 'KWH SEPTEMBER 2010', 'KWH OCTOBER 2010', 'KWH NOVEMBER 2010', 'KWH DECEMBER 2010'];
  const kwhByCommunityAndMonths = {};
  const startIndex = startMonth - 1;
  const endIndex = endMonth - 1; 
  for (var i = 0; i < data.length; i ++) {
    var name = data[i]['COMMUNITY AREA NAME'];
    var keyVal = data[i][otherKey];
    if (!(name in kwhByCommunityAndMonths)) {
      kwhByCommunityAndMonths[name] = [0, 0, 0, 0];
    }
    let sum = 0;
    let num;
    for (var j = startIndex; j < endIndex; j ++) {
      num = Number(data[i][monthColumns[j]]);
      if (num) {
        kwhByCommunityAndMonths[name][0] += num;        
        kwhByCommunityAndMonths[name][2] += 1;

      } 


    }
    if (keyVal) {
      kwhByCommunityAndMonths[name][1] += Number(keyVal);
      kwhByCommunityAndMonths[name][3] += 1;

    }
  }
  return kwhByCommunityAndMonths;
}

export function aggregateByCommunityFormat(data, startMonth, endMonth, otherKey, log) {
  const finalFormat = aggregateByCommunityAndMonthsAlt(data, startMonth, endMonth, otherKey)
  const res = Object.keys(finalFormat).reduce((total,key) => {
    let subObject;
    if (log) {
      subObject = {key, y: Math.log2(finalFormat[key][0] / finalFormat[key][2]), x: finalFormat[key][1] / finalFormat[key][3]}
    } else if (!log) {
      subObject = {key, y: finalFormat[key][0] / finalFormat[key][2], x: finalFormat[key][1] / finalFormat[key][3]}
    }
    total.push(subObject)
    return total;
  }, []);
  return res
}


function getdifference(dataX, dataY) {
  let sumX = dataX.reduce((agg, curr) => agg += curr);
  let avgX = sumX / dataX.length;
  let sumY = dataY.reduce((agg, curr) => agg += curr);
  let avgY = sumY / dataY.length;
  const diff = avgX - avgY

  return 0
}


export function tTestText(data, sides) {
  const dataX = []
  const dataY = []
  let length = 0
  data.forEach((row) => {
    dataX.push(row["x"]) 
    dataY.push(row["y"])
    length += 1

  });
  const diff = getdifference(dataX, dataY)
  const test = tTestTwoSample(dataX, dataY, diff)
  console.log("p", length, dataX, dataY, test)
  const pValue = ttest(test, length , sides)
  const strIdea = pValue > .05 ? " NOT ": " "

  const done = `The p-value is ${pValue} and is${strIdea}stastically signifigant`
  return done
}

/************************************************************************************************************************
	aggregateByCommunityAndIncome(data)

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
export function aggregateByCommunityAndIncome(data) {
	console.log('here');
	const incomeByCommunity = {};
	const popByCommunity = {};
	const percapincomeByCommunity = {};
	for (var i = 0; i < data.length; i ++) {
		var name = data[i]['COMMUNITY AREA NAME'];
		if (!(name in incomeByCommunity)) {
			incomeByCommunity[name] = Number(data[i]['MEDIAN_INCOME']);
		} 
	}
	return incomeByCommunity;
}
