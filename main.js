const fs = require("fs"),
	{ parse } = require("csv-parse"),
	{ outputCSV } = require("./outputter"),
	{ extractData, formatInput } = require("./formatter");
require("colors");

if (!process.argv[2]) {
	console.error("Please enter CSV file path!".red);
	process.exit();
}

let ordersCount = 0,
	data = {};

fs.createReadStream(process.argv[2])
	.on("error", (err) => {
		console.error(err);
	})
	.pipe(parse({ delimiter: ",", from_line: 1 }))
	.on("data", (row) => {
		ordersCount++;
		data = formatInput(row, data);
	})
	.on("end", () => {
		const { avgQuantity, mostPopularBrand } = extractData(data, ordersCount);
		outputCSV(avgQuantity, mostPopularBrand);
		console.log("CSV files created successfuly!".green);
	});
