var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(8080, function () {
  console.log('The Labi app is available at "http://127.0.0.1:8080" ! ');
});
