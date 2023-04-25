const http = require('http');
const fs = require('fs');

const requestListener = function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.writeHead(200);
	if(req.url == "/list") {
		res.end(fs.readFileSync('logs'));
		return;
	} else if(req.url == '/spec') {
		res.end(fs.readFileSync('full/Tomi@1682424487704'));
		return;
	} else if(req.url.slice(0, 5) == "/data") {
		var data = + new Date()+"@"+req.url+"\n";
		fs.appendFileSync('logs', data);
		console.log(data);
		res.end('ok');
		return;
	} else if(req.url.slice(0, 5) == "/full") {
		console.log('full' + req.url);

		let body = [];
		req.on('data', (chunk) => {
		body.push(chunk);
		}).on('end', () => {
			body = Buffer.concat(body).toString();
			fs.writeFileSync('./full/'+req.url.split('=')[1] + "@" + (+new Date()), body);
		});
		
		res.end('ok')
	} else {

		res.end(fs.readFileSync('./chart.html'));
		return;
	}
}

const server = http.createServer(requestListener);
server.listen(1337);
