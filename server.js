const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(body-parser.urlencoded({extended: true}));

//Brauchen wir eventell gar nicht
app.engine('.ejs', require 'ejs').__express);
app.set('view engine', 'ejs');

const port = 3000;
app.listen(port, function(){
  console.log('listening on port' + port);
});

//Startseite
app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});
