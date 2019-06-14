var express = require('express');
var router = express.Router();
const Request = require("request");

router.get('/', function (req, res, error) {
    var accountID = req.query.accountID;
    var options = {
      url: `https://api.fortnitetracker.com/v1/profile/account/${accountID}/matches`,
      method: 'GET',
      headers: {
        "TRN-Api-Key": "f92be6be-cb17-43c7-96e5-6a442ab5b65e"
      }
    };
     if(error) {
      res.status(404).send("AccountId not found");
     } else  {
      Request.get(options, (error, response,  body) => {
        if (error) {
         res.status(404).send("Request failed")
        }
         const data = JSON.parse(body);
         res.status(200).send(data)
     });
     }
  });

  module.exports = router;
