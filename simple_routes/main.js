"use strict";
const http = require("http");
const httpStatus = require("http-status-codes");

const port = 3000;

const getJSONString = obj => {
	return JSON.stringify(obj, null);
};

const routeResponseMap = {
	"/info": "<h1>Info Page</h1>",
	"/contact": "<h1>Contact Us</h1>",
	"/about": "<h1>Learn More About Us.</h1>",
	"/hello": "<h1>Say hello by emailing us </h1><a href=\"slivin.work@gmail.com\">here</a>",
	"/error": "<h1>Sorry the page you are looking for is not here.</h1>"
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
	if (routeResponseMap[req.url]) {
		res.end(routeResponseMap[req.url]);
	} else {
		res.end("<h1>Welcome!</h1>");
	}
	console.log(`Method: ${getJSONString(req.method)}`);
	console.log(`URL: ${getJSONString(req.url)}`);
	console.log(req.headers);
});
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
