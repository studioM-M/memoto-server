var express = require('express');
var router = express.Router();
const {google} = require('googleapis');
const account = require('../google-keys.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const JWTClient = new google.auth.JWT(
    account.client_email,
    null,
    account.private_key,
    ["https://www.googleapis.com/auth/androidpublisher"]
);

router.get('/accessToken', (req, res) => {
    JWTClient.getAccessToken((err,token)=>{
        if(err){
            return res.status(404).send("get access token failed");
        }

        return res.status(200).send(token);
    })
});

module.exports = router;
