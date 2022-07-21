const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const getViewUrl = (url) => {
	return url == '/' ? 'views/index.html' : `views${url}.html`;
};

http.createServer((req, res) => {
	let url = getViewUrl(req.url);
	fs.readFile(url, (error, data) => {
		if (error) {
			res.writeHead(httpStatus.StatusCodes.NOT_FOUND);
			res.write("<h1>FILE NOT FOUND</h1>");
		} else {
			res.writeHead(httpStatus.StatusCodes.OK, {
				"Content-Type": "text/html"
			});
			res.write(data);
		}
		res.end();
	});
}).listen(port);
console.log(`The server has started and is listening on port number: ${port}`);