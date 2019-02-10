var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Atlas Data Importer" });
});

router.post("/", function(req, res) {
  console.log(req.body.host);
  console.log(req.body.user);

  var exec = require("child_process").exec;
  var command =
    "mongoimport --host " +
    req.body.host +
    " --ssl --username " +
    req.body.user +
    " --password " +
    req.body.password +
    " --authenticationDatabase admin --db Workshop --collection Restaurants --type JSON --file primer-dataset.json";
  exec(command, function(error, stdout, stderr) {
    if (!error) {
      console.log(stdout)
      var result = "Data imported successfully";
      console.log(result);
      res.render("index", { result: result });
    } else {
      console.log(error);
      res.render("index", { result: error });
    }
  });

});

module.exports = router;
