const path = require("path");
const createCsvWriter = require("csv-writer").createArrayCsvWriter;

module.exports = {
	outputCSV: function (arr, arr2) {
		const filename = path.basename(process.argv[2]).replace(".csv", "");

		const csvWriter = createCsvWriter({
			path: `0_${filename}.csv`,
		});

		const csvWriter1 = createCsvWriter({
			path: `1_${filename}.csv`,
		});

		csvWriter.writeRecords(arr);

		csvWriter1.writeRecords(arr2);
	},
};
