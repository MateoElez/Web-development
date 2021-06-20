const express = require('express');
const router = express.Router();
const authHandler = require('./helpers/auth-handler');


router.get('/', authHandler, function (req, res, next) {
    //####################### ZADATAK #######################
    // - obrisati sadržaj košarice
    req.session.cart = undefined; // ili s delete
    // - odjaviti registriranog korisnika iz sustava
    req.session.user = undefined; // ili s delete
    // - napraviti redirect na osnovnu stranicu
    req.session.destroy((err) => {
    
        if(err) {
          //report possible error
          console.log(err)
        }
        else {
          //redirect to the main page
          res.redirect('/')
        }
      })
    //#######################################################

});

module.exports = router;