var express = require('express');
var router = express.Router();
const Request = require("request");

router.get('/', function (req, res) {
    const accountID = req.query.accountID;
    const options = {
      url: `https://api.fortnitetracker.com/v1/profile/account/${accountID}/matches`,
      method: 'GET',
      headers: {
        "TRN-Api-Key": "f92be6be-cb17-43c7-96e5-6a442ab5b65e"
      }
    };
      Request.get(options, (error, response,  body) => {
        if (error) {
            return console.dir(error);
        }
         try {
             const data = JSON.parse(body);
             res.status(200).send(data)
         }
         catch {
            res.status(500).send("Error with the request")
         }
     });
  });

  module.exports = router;


  