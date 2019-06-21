var express = require('express');
var router = express.Router();
const Request = require("request");

router.get('/', function (req, res) {
    var options = {
      url: 'https://api.fortnitetracker.com/v1/store',
      method: 'GET',
      headers: {
        "TRN-Api-Key": process.env.REST_TRACKER
      }
    };
    Request.get(options, (error, response,  body) => {
       if (error) {
            return console.dir(error);
        }
        const data = JSON.parse(body);
        res.status(200).send(data)
    });
   
  });

module.exports = router;


