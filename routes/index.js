var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
  console.log(req.body.host);
  console.log(req.body.user);

  var exec = require('child_process').exec;
  var command = 'mongoimport --host ' + req.body.host + ' --ssl --username ' + req.body.user + ' --password ' + req.body.password + ' --authenticationDatabase admin --db Workshop --collection Restaurants --type JSON --file primer-dataset.json'
  exec(command, function (error, stdout, stderr) {
	if (!error) {
		console.log ("Data imported successfully!");
	} else
		console.log(error);
	}
   );

});


module.exports = router;
