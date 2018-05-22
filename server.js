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
app.listen(port, () => {
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

//----------------------------------------------------------------------------------------------//


//Startseite zeigt die 4 Katzen und Hunde mit den Meisten votes an
app.get('/', function (req,res){
	let topDogs =[];
	let topCats =[];

	db.all(`SELECT * FROM dogs ORDER BY votes DESC LIMIT 4`,function(error,rows){
		if (error){
			console.log(err.message);

		}
		else{
			console.log(rows);
			topDogs=rows;
			db.all(`SELECT * FROM cats ORDER BY votes DESC LIMIT 4`,function(error,rowsC){
				if (error){
					console.log(err.message);

				}else{
					console.log(rowsC);
					topCats=rowsC
			//cats section --holt daten über cats aus db
			db.all(`SELECT * FROM cats`,function(error,rowsCats){
            if (error){
              console.log(err.message);
            }
			else{
				let iCats =0;
				let jCats= 0;
				//Verhindern das zwei gleiche bilder kommen
				do{
					iCats=Math.floor(Math.random()*rowsCats.length);
					jCats=Math.floor(Math.random()*rowsCats.length);
				}while(iCats==jCats);

              let randomCats =[iCats,jCats];

              //dogs section --holt alle daten von den hunden aus db
              db.all(`SELECT * FROM dogs`,function(error,rowsDogs){
            		if (error){
            			console.log(err.message);

            		}
            		else{
            			//Zwei zufällige bilder aus db auswählen
            			let iDogs =0;
						let jDogs= 0;
						//Verhindern das zwei gleiche bilder kommen
						do{
							iDogs=Math.floor(Math.random()*rowsDogs.length);
							jDogs=Math.floor(Math.random()*rowsDogs.length);
						}while(iDogs==jDogs);

						let randomDogs =[iDogs,jDogs];

                  res.render('cats_and_dogs',{'topDogs': topDogs || [],
        					'topCats' : topCats || [],
                  'rowsCats':  rowsCats || [],
            			'randomCats' : randomCats,
                  'rowsDogs':  rowsDogs || [],
            			'randomDogs' : randomDogs,
                  });
                }
              });
            }
          });

				}
			});
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
		res.redirect('/');
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
		res.redirect('/');
	});
});
