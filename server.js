const express = require('express');
const ejs = require('ejs');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//öffentlicher ordner, der von außen erreichbar ist - hier für CSS(ginge aber auch für bilder)
app.use(express.static(__dirname + '/public'));

app.engine('.ejs', ejs.__express);
app.set('view engine', 'ejs');

const port = 3000;
app.listen(port, function(){
  console.log('listening on port' + port);
});

//Startseite
app.get('/', function(request, response){
  response.render('cats_and_dogs');
});
