var express = require('express');
var router = express.Router();
const Request = require("request");

router.get('/', function (req, res) {
  var username = req.query.username;
  var options = {
    url: `https://api.fortnitetracker.com/v1/profile/pc/${username}`,
    method: 'GET',
    headers: {
      "TRN-Api-Key": "f92be6be-cb17-43c7-96e5-6a442ab5b65e"
    }
  };
  Request.get(options, (error, response,  body) => {
    console.log("body", body)
     if (error) {
          return console.dir(error);
     }
      const data = JSON.parse(body);
      res.status(200).send(data)
  });
 
});
module.exports = router;
