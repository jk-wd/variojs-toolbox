var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../../public')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index-dev.html'));
});

app.listen(8088);
console.log('Listening on port 8088');