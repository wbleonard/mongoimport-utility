var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Atlas Data Importer" });
});

router.post("/", function(req, res) {
  console.log("host received: " + req.body.host);
  console.log(req.body.user);

  
  // Support copying the entire command from the Command Line Tools page
  host = req.body.host;
  startPoint = host.indexOf("--host");
  endPoint = host.lastIndexOf("27017");
  
  if (startPoint > 0) { 
    startPoint = startPoint + 7 // Adjust to beginning of host value
    endPoint = endPoint + 6     // Adjust to end of host value
    host = host.slice(startPoint, endPoint)
  } else {
    // Assume the host was parsed out manually
    host = req.body.host
  }

  console.log("host used: " + host);

  var exec = require("child_process").exec;
  var command =
    "mongoimport --host " +
    host +
    " --ssl --username " +
    req.body.user +
    " --password " +
    req.body.password +
    " --authenticationDatabase admin --db Workshop --collection Restaurants --type JSON --file primer-dataset.json";
  console.log(command)
  exec(command, function(error, stdout, stderr) {
    if (!error) {
      var result = "imported 25359 documents";
      console.log(result);
      res.render("index", { result: result });
    } else {
      console.log(error);
      res.render("index", { result: error });
    }
  });

});

module.exports = router;
