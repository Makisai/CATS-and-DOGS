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

//Datenbankverbindung
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('cats_and_dogs.db',(error)=>{
	if (error){
		console.error (error.message);
	}
	console.log('Connected to database cats_and_dogs')
});

//Startseite zeigt die 5 Katzen und Hunde mit den Meisten votes an
app.get('/', function (req,res){
	let topDogs =[];
	let topCats =[];
	
	db.all(`SELECT * FROM dogs ORDER BY votes DESC LIMIT 5`,function(error,rows){
		if (error){
			console.log(err.message);
		
		}
		else{
			console.log(rows);
			topDogs=rows;
			db.all(`SELECT * FROM cats ORDER BY votes DESC LIMIT 5`,function(error,rowsC){
				if (error){
					console.log(err.message);
				
				}
				else{
					console.log(rowsC);
					topCats=rowsC
					res.render('home',{'topDogs': topDogs || [],
					'topCats' : topCats || []});
				}
			});
		}
	});

});

//Hunde bewerten
app.get('/rateDogs', function (req,res){
	
	db.all(`SELECT * FROM dogs`,function(error,rows){
		if (error){
			console.log(err.message);
		
		}
		else{
			//Zwei zufällige bilder aus db auswählen
			let random =[Math.floor(Math.random()*rows.length),Math.floor(Math.random()*rows.length)]
			//Verhindern das zwei gleiche bilder kommen
			if(random[0]==random[1]){
						
				random[1]= Math.floor(Math.random()*rows.length);
			}
			
			//Übergen aller Reihen der db und Array mit zufallszahlen
			res.render('rateDogs', {'rows':  rows || [],
										'random' : random});
			
		}
	});

});

//Katzen bewerten
app.get('/rateCats', function (req,res){
	
	db.all(`SELECT * FROM cats`,function(error,rows){
		if (error){
			console.log(err.message);
		
		}
		else{
			let random =[Math.floor(Math.random()*rows.length),Math.floor(Math.random()*rows.length)]
			//Verhindern das zwei gleiche bilder kommen
			if(random[0]==random[1]){
						
				random[1]= Math.floor(Math.random()*rows.length);
			}
			
			
			res.render('rateCats', {'rows':  rows || [],
										'random' : random});
			
		}
	});

});

//Upvote Hunde
//Addiert +1 zur Spalte 'votes' des gewählten Bildes
app.post('/AddierenD/:Id:votes',function(req,res){
	
	const id = req.params['Id'];
	let votes = Number(req.params['votes']);
	votes +=1;
	const sql = `UPDATE dogs SET votes =${votes} WHERE id =${id}`;
	console.log(sql);
	db.run(sql, function(err){
		res.redirect('/rateDogs');
	});
});	

//Upvote Katzen
app.post('/AddierenC/:Id:votes',function(req,res){
	
	const id = req.params['Id'];
	let votes = Number(req.params['votes']);
	votes +=1;
	const sql = `UPDATE cats SET votes =${votes} WHERE id =${id}`;
	console.log(sql);
	db.run(sql, function(err){
		res.redirect('/rateCats');
	});
});	