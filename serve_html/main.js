const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const fs = require("fs");

const getViewUrl = (url) => {
	return url == '/' ? 'views/index.html' : `views${url}.html`;
};

const sendErrorResponse = res => {
	res.writeHead(httpStatus.StatusCodes.NOT_FOUND, {
		"Content-Type": "text/html"
	});
	res.write("<h1>FILE NOT FOUND</h1>");
	res.end();
}

const customReadFile = (file_path, res) => {
	if (fs.existsSync(file_path)) {
		fs.readFile(file_path, (error, data) => {
			if (error) {
				console.log(error);
				sendErrorResponse(res);
				return;
			}
			res.write(data);
			res.end();
		});
	} else {
		sendErrorResponse(res);
	}
}

http.createServer((req, res) => {
	//let url = getViewUrl(req.url);
	let url = req.url;
	if (url == "/") {
		customReadFile(`./views/index.html`, res);
	} else if (url.indexOf(".html") !== -1) {
		res.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "text/html"
		});
		customReadFile(`./views${url}`, res);
	} else if (url.indexOf(".js") !== -1) {
		res.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "text/javascript"
		});
		customReadFile(`./public/js${url}`, res);
	} else if (url.indexOf(".css") !== -1) {
		res.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "text/css"
		});
		customReadFile(`./public/css${url}`, res);
	} else if (url.indexOf(".png") !== -1) {
		res.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "image/png"
		});
		customReadFile(`./public/images${url}`, res);
	} else {
		sendErrorResponse(res);
	}
}).listen(port);
console.log(`The server has started and is listening on port number: ${port}`);