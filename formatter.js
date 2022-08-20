module.exports = {
	extractData: function (data, ordersCount) {
		let avgQuantity = [];
		let mostPopularBrand = [];
		Object.keys(data).forEach((product) => {
			avg = (
				data[product].quantities.reduce((a, b) => parseInt(a) + parseInt(b)) /
				ordersCount
			).round(4);

			avgQuantity.push([product, avg]);

			mostPopularBrand.push([
				product,
				getMostRepeatedItem(data[product].brands),
			]);
		});

        return {avgQuantity, mostPopularBrand}
	},

    formatInput: function (row, data){
        if (data[row[2]] !== undefined) {
			data[row[2]]["quantities"] = [...data[row[2]]["quantities"], row[3]];
			data[row[2]]["brands"] = [...data[row[2]]["brands"], row[4]];
		} else {
			data[row[2]] = { quantities: [row[3]], brands: [row[4]] };
		}

        return data;
    }
};

let getMostRepeatedItem = (arr) => {
	if (arr.length == 0) return null;
	let itemsMap = {},
		result = arr[0],
		maxCount = 1;
	for (let i = 0; i < arr.length; i++) {
		let el = arr[i];
		if (itemsMap[el] == null) itemsMap[el] = 1;
		else itemsMap[el]++;
		if (itemsMap[el] > maxCount) {
			result = el;
			maxCount = itemsMap[el];
		}
	}
	return result;
};

Number.prototype.round = function (n) {
	const d = Math.pow(10, n);
	return Math.round((this + Number.EPSILON) * d) / d;
};
