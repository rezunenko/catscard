var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require("path");

var card_list = [];
var questionNumber = 0;

function replacer(str){
	switch(str){
		// case '\n': return '&\#010;';
		default: return str;
	}
}

fs.readFile('data/cards.json',function(err, data){
  if(err)
    throw err;

  var cards = JSON.parse(data);
  for(var item in cards){
		card_list[card_list.length] = cards[item];

		card_list[card_list.length-1].question.code = card_list[card_list.length-1].question.code.replace(/\n/g,replacer);
		card_list[card_list.length-1].answer.code = card_list[card_list.length-1].answer.code.replace(/\n/g,replacer);
  }
  // console.log(card_list[0]);
})

/* GET home page. */
router.get('/', function(req, res, next) {
	questionNumber++;
  if(questionNumber >= card_list.length)
		questionNumber=0;
	res.render('card', card_list[questionNumber]);
});


// var p = 'data';
// fs.readdir(p, function(err,files){
//   if(err){
//     throw err;
//   }
//
//   files.map(function(file){
//     return path.join(p,file);
//   }).filter(function(file){
//     return fs.statSync(file).isFile();
//   }).forEach(function(file){
// 		console.log("%s (%s)", file, path.extname(file));
//   })
// })


module.exports = router;
