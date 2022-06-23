"use strict";
const http = require("http");
const httpStatus = require("http-status-codes");

const port = 3000;

const getJSONString = obj => {
	return JSON.stringify(obj, null);
};

const app = http.createServer((req, res) => {
	console.log("Received an incoming request!");
	var body = [];
	req.on("data", (bodyData) => {
		body.push(bodyData);
	});
	req.on("end", () => {
		body = Buffer.concat(body).toString();
		console.log(`Request Body Contents: ${body}`);
	});
	res.writeHead(httpStatus.OK, {
		"Content-Type": "text/html"
	});
	let responseMessage = "<h1>Hello, Universe!</h1>";
	res.write(responseMessage);
	res.end();
	console.log(`Sent a response : ${responseMessage}`);
	console.log(`Method: ${getJSONString(req.method)}`);
	console.log(`URL: ${getJSONString(req.url)}`);
	console.log(req.headers);
});
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
